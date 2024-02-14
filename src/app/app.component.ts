import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  standalone: true,
  imports: [HdWalletMultiButtonComponent, RouterModule],
  selector: 'bob-root',
  template:`
    <header class="px-16 pt-20 pb-8 relative">
      <h1 class= "text-center text-5xl mb-4">My bank</h1>

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>
      @if(account()){
        <div class="absolute top-4 left-4 flex items-center gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8"/>
          <p class="text-2xl font-bold">
            {{ account()?.info?.name }}
          </p>
          <p class="text-2xl font-bold">
            {{ account()?.balance  }}
          </p>
        </div>
      }
    </header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  private readonly _shiftyApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shiftyApiService.getAccount(this._publicKey()?.toBase58()),
  { requireSync:true },
  ); 
}