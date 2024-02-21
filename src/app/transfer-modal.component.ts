import { Component, OnInit, inject } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { injectTransactionSender, ConnectionStore } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { environment } from 'src/environment/environment';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'transfer-modal',
  standalone: true,
  imports: [TransferFormComponent],
  template: `
    <div class="px-8 pt-16 pb-8">
      <h2 class="text-3xl text-center mb-8">Transferir Fondos</h2>
      <transfer-form (submitForm)="onTransfer($event)"></transfer-form>
    </div>
  `,
})
export class TransferModalComponent implements OnInit {
  private readonly _transactionSender = injectTransactionSender();
  private readonly _shyftyApiService = inject(ShyftApiService);
  private readonly _connectionStore = inject(ConnectionStore);

  ngOnInit(){
     this._connectionStore.setEndpoint(this._shyftyApiService.getEndpoint());
  }

  onTransfer(payload: TransferFormPayload) {
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
        next: (signature) => console.log(`Firma: ${signature}`),
        error: (error) => console.error(error),
        complete: () => console.log('Transacción lista'),
      });
  }
}
