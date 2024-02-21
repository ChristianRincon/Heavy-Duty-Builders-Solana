import { Component, inject } from "@angular/core";
import { ShyftApiService } from "./shyft-api.service";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';

@Component ({
    selector:'balance-section',
    standalone:true,
    template:`    
        @if(account()){
            <div class="mb-4 top-4 left-4 flex justify-center items-center gap-2">
                <img [src]="account()?.info?.image" class="w-8 h-8" />
                <p class="text-xl">{{ account()?.balance }}</p>
            </div>
        }@else{
            <p class="text-center text-xl">Esperando su wallet...</p>
        }
    `
})
export class BalanceSectionComponent{
    private readonly _shyftyApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly account = computedAsync(
        () => this._shyftyApiService.getAccount(this._publicKey()?.toBase58()),
        { requireSync: false },
    );
}