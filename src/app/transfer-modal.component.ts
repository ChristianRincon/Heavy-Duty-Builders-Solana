import { Component } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';

@Component({
    selector: 'transfer-modal',
    standalone: true,
    imports:[TransferFormComponent],
    template: `
        <div class="px-8 pt-16 pb-8">
            <h2 class="text-3xl text-center mb-8"> Transferir Fondos </h2>
            <transfer-form (submitForm)="onTransfer($event)"></transfer-form>
        </div>
        `
})
export class TransferModalComponent {
   
    onTransfer(payload: TransferFormPayload){
        console.log(payload);
    }
 }
