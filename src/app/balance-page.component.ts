import { Component, inject} from "@angular/core";
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { toSignal } from '@angular/core/rxjs-interop';

@Component(
    {
        selector:'balance-section',
        standalone: true,
        imports:[],
        template:`
        
      @if(account()){
        <div class="mb-4 top-4 left-4 flex justify-center items-center gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8"/>
          <p class="text-2xl font-bold">
            {{ account()?.info?.name }}
          </p>
          <p class="text-2xl font-bold">
            {{ account()?.balance  }}
          </p>
        </div>
      }@else{
        <div class="text-center">Esperando su Wallet...</div>
      }
        `
    }
)
export class BalancePageComponent {
    private readonly _shiftyApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shiftyApiService.getAccount(this._publicKey()?.toBase58()),
  { requireSync: false },
  ); 
}