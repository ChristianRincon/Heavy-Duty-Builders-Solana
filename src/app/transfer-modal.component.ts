import { Component, OnInit, inject, computed } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { injectTransactionSender, ConnectionStore } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { environment } from 'src/environment/environment';
import { ShyftApiService } from './shyft-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'transfer-modal',
  standalone: true,
  imports: [TransferFormComponent, MatProgressBarModule],
  template: `
    <div class="px-8 pt-16 pb-8">
      <h2 class="text-3xl text-center mb-8">Transferir Fondos</h2>
      <transfer-form (submitForm)="onTransfer($event)"></transfer-form>

      @if (processingStatus()) {
        <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4">
          <mat-progress-bar mode="indeterminate" color="warn"></mat-progress-bar>
            <p class="capitalize text-xl">{{ transactionStatus() }}</p>
          <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
        </div>
      }
    </div>
  `,
})
export class TransferModalComponent implements OnInit {
  private readonly _transactionSender = injectTransactionSender();
  private readonly _shyftyApiService = inject(ShyftApiService);
  private readonly _connectionStore = inject(ConnectionStore);
  private readonly _matDialogRef = inject(MatDialogRef);
  private readonly _matSnackBar = inject(MatSnackBar);

  ngOnInit(){
     this._connectionStore.setEndpoint(this._shyftyApiService.getEndpoint());
  }

  readonly transactionStatus = computed(() => this._transactionSender().status);
  readonly processingStatus = computed(
    () =>
      this.transactionStatus() === 'sending' ||
      this.transactionStatus() === 'confirming' ||
      this.transactionStatus() === 'finalizing',
  );

  onTransfer(payload: TransferFormPayload) {
    this._matDialogRef.disableClose = true;

    this._transactionSender
      .send(({ publicKey }) =>
        createTransferInstructions({
          amount: payload.amount,
          mintAddress: environment.MINT,
          receiverAddress: payload.receiverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo
        }),
      )
      .subscribe({
        next: (signature) => [
          this._matSnackBar.open(
            `Listo! Puedes chequear la transacción en https://explorer.solana.com/tx/${signature}`, 'Cerrar', {
              verticalPosition: 'top',
              horizontalPosition: 'end',
            },
          ),
          this._matDialogRef.close()
        ],
        error: (error) => [
          this._matSnackBar.open(`🚩 Hubo un ${error}`, 'Cerrar', {
              verticalPosition: 'top',
              horizontalPosition: 'end',
              duration: 5000          
          }),
          this._matDialogRef.disableClose = false
        ],
        complete: () => this._matDialogRef.disableClose = false,
      });
  }

}
