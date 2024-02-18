import { Component, inject } from "@angular/core";
import { ShyftApiService } from "./shyft-api.service";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component ({
    selector:'transaction-section',
    standalone:true,
    imports: [MatTableModule, MatCard],
    template:`    
    <mat-card class="px-4 py-8 items-center">
        <h2 class="mb-5 text-3xl">Historial de Transacciones</h2>
        <br>
      @if (!transactions()) {
        <p class="text-center text-xl text-green-300">Esperando su wallet...</p>
      } @else if (transactions()?.length === 0) {
        <p class="text-center">No hay transacciones disponibles.</p>
      } @else {
        <table mat-table [dataSource]="transactions() ?? []">
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let element">{{ element.timestamp }}</td>
          </ng-container>

          <ng-container matColumnDef="fee">
            <th mat-header-cell *matHeaderCellDef>Monto del Fee</th>
            <td mat-cell *matCellDef="let element">{{ element.fee }}</td>
          </ng-container>

          <ng-container matColumnDef="origen">
            <th mat-header-cell *matHeaderCellDef>Origen</th>
            <td mat-cell *matCellDef="let element">{{ element.fee_payer }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
`
})
export class TransactionSectionComponent{
    private readonly _shyftyApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    readonly displayedColumns = ['type', 'status', 'timestamp', 'fee', 'origen'];

    readonly transactions  = computedAsync(
        () => this._shyftyApiService.getTransactions(this._publicKey()?.toBase58()),
        { requireSync: false },
    );
}