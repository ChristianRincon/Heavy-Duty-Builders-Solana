import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({ providedIn: 'root' })

export class ShyftApiService {

    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { 'x-api-key': environment.API_TOKEN };
    private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

    getAccount(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }
        
        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');
        url.searchParams.append('network', 'mainnet-beta');
        url.searchParams.append('wallet', publicKey);
        url.searchParams.append('token', this._mint);

        return this._httpClient.get<{ result: { balance: number; info: { name: string, image: string } } }>(
            url.toString(),
            { headers: this._header }
        )
            .pipe(map(({ result }) => result));
    }

}