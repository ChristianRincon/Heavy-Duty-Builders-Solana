import { Component, inject } from "@angular/core";
import { ShyftApiService } from "./shyft-api.service";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';

@Component ({
    selector:'transaction-section',
    standalone:true,
    template:`    
    @if(account()){
        <div class="flex justify-center items-center">
        <table class="text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Fecha
                </th>
                <th scope="col" class="px-6 py-3">
                    Monto del fee
                </th>
                <th scope="col" class="px-6 py-3">
                    Origen
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ account()?.timestamp }}
                </th>
                <td class="px-6 py-4">
                    {{ account()?.fee }}
                </td>
                <td class="px-6 py-4">
                    {{ account()?.fee_payer }}
                </td>
            </tr>
        </tbody>
        </table>
        </div>
        <!--<div class="mb-4 top-4 left-4 flex justify-center items-center gap-2">
            <p class="text-xl">{{ account()?.timestamp }}</p>
            <p class="text-xl">{{ account()?.fee }}</p>
            <p class="text-xl">{{ account()?.fee_payer }}</p>
        </div>-->
    }@else{
        <p class="text-center text-xl">Esperando su wallet...</p>
    }
`
})
export class TransactionSectionComponent{
    private readonly _shyftyApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);

    readonly account = computedAsync(
        () => this._shyftyApiService.getTransactions(this._publicKey()?.toBase58()),
        { requireSync: false },
    );
}