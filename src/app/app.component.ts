import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { HdWalletMultiButtonComponent } from "@heavy-duty/wallet-adapter-material";

@Component({
  standalone: true,
  imports: [HdWalletMultiButtonComponent, RouterModule, MatAnchor],
  selector: 'solana-bootcamp-root',
  template:`
  <header class="py-8 relative">
    <h1 class="text-5xl text-center mb-4">Banco de Christian</h1>

    <div class="flex justify-center mt-5 mb-6">
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>

    <nav>
      <ul class="flex justify-center items-center gap-4">
        <li>
          <a [routerLink]="['balance']" mat-raised-button>Balance</a>
        </li>
        <li>
          <a [routerLink]="['settings']" mat-raised-button>Settings</a>
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
  
}
