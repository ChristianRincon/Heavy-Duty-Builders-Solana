import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { HdWalletMultiButtonComponent } from "@heavy-duty/wallet-adapter-material";
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';

@Component({
  standalone: true,
  imports: [HdWalletMultiButtonComponent, RouterModule, MatAnchor, MatButtonModule, MatIcon],
  selector: 'solana-bootcamp-root',
  template:`
  <header class="py-8 relative">

    <div class="grid justify-items-end mr-10">
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>

    <h1 class="text-5xl text-center mb-10">Banco de Christian</h1>

    <nav class="mb-8">
      <ul class="flex justify-center items-center gap-7">
        <li>
          <button (click)="onTransfer()" mat-raised-button color="primary">
            <mat-icon matSuffix>ios_share</mat-icon>
            Transferir
          </button>
        </li>
        <li>
          <a [routerLink]="['balance']" mat-raised-button>
            <mat-icon matSuffix>account_balance</mat-icon>
              Ver Balance
          </a>
        </li>
        <li>
          <a [routerLink]="['transaction']" mat-raised-button>
            <mat-icon matSuffix>history</mat-icon>
              Ver Historial
          </a>
        </li>
      </ul>
    </nav>

  </header>

  <main>
    <router-outlet></router-outlet>
  </main>
  `
})
export class AppComponent {
  private readonly _matdialog = inject(MatDialog);

  onTransfer(){
    this._matdialog.open(TransferModalComponent);
  }

}
