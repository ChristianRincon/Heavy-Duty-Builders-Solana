import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

export interface TransferFormModel{
    memo: string | null;
    amount: number | null;
    receiverAddress: string | null;
}

export interface TransferFormPayload{
    memo: string;
    amount: number;
    receiverAddress: string;
}

@Component({
    selector: 'transfer-form',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton, MatButtonModule, MatTooltipModule],
    template:`
        <form #form="ngForm" class="w-[400px]" (ngSubmit)="onSubmitForm(form)">
            <mat-form-field appearance="fill" class="w-full mb-4">
                <mat-label>Concepto</mat-label>
                <input 
                    name="memo" 
                    type="text" 
                    matInput 
                    placeholder="Ejemplo: Le transferí a X persona" 
                    [(ngModel)]="model.memo" 
                    required 
                    #memoControl="ngModel"
                />
                <mat-icon matSuffix>description</mat-icon>

                @if (form.submitted && memoControl.errors){
                    <mat-error>
                        @if (memoControl.errors['required']){
                            El motivo es obligatorio.
                        }
                    </mat-error>
                } @else{
                    <mat-hint>Debe ser el motivo de la transferencia</mat-hint>
                }
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full mb-4">
                <mat-label>Monto</mat-label>
                <input 
                    name="amount" 
                    type="number"
                    min="0"
                    matInput 
                    placeholder="Ingresa el monto aquí" 
                    [(ngModel)]="model.amount" 
                    required 
                    #amountControl="ngModel"
                />
                <mat-icon matSuffix>attach_money</mat-icon>

                @if (form.submitted && amountControl.errors){
                    <mat-error>
                        @if (amountControl.errors['required']){
                            El monto es obligatorio.
                        } @else if (amountControl.errors['min']){
                            El monto debe ser mayor a cero
                        }
                    </mat-error>
                } @else{
                    <mat-hint>Debe ser un monto mayor a cero</mat-hint>
                }
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full mb-4">
                <mat-label>Destinatario</mat-label>
                <input 
                    name="receiverAddress" 
                    type="text"
                    matInput 
                    placeholder="Public Key del Destinatario" 
                    [(ngModel)]="model.receiverAddress" 
                    required 
                    #receiverAddressControl="ngModel"
                />
                <mat-icon matSuffix>key</mat-icon>

                @if (form.submitted && receiverAddressControl.errors){
                    <mat-error>
                        @if (receiverAddressControl.errors['required']){
                            El destinatario es obligatorio.
                        } 
                    </mat-error>
                } @else{
                    <mat-hint>Debe ser una wallet de Solana</mat-hint>
                }
            </mat-form-field>

            <footer class="flex justify-center gap-10">
                <span [matTooltip]="form.invalid ? 'Complete Todos Los Campos' : 'Pulse Para Enviar'">
                    <button type="submit" mat-fab class="hover:scale-95" [disabled]="form.invalid">
                        <mat-icon matSuffix>check</mat-icon>
                    </button>
                </span>
                <button type="button" mat-fab matTooltip="Pulse Para Cancelar" (click)="closeForm()" class="hover:scale-95" color="warn">
                    <mat-icon matSuffix>close</mat-icon>
                </button>
            </footer>
        </form>
        `
})
export class TransferFormComponent {
    private readonly _matSnackBar = inject(MatSnackBar);
    private readonly _matDialogRef = inject(MatDialogRef);

    readonly model: TransferFormModel = {
        memo: null,
        amount: null,
        receiverAddress: null
    };

    @Output () readonly submitForm = new EventEmitter<TransferFormPayload>()
  
    onSubmitForm(form: NgForm){
        if(form.invalid || this.model.memo === null || this.model.amount === null || this.model.receiverAddress === null){
            this._matSnackBar.open('Debe completar todos los campos', 'Cerrar', {
                verticalPosition: 'bottom',
                horizontalPosition: 'end',
                duration: 5000          
            });
        }else{
            this.submitForm.emit({
                memo: this.model.memo,
                amount: this.model.amount * 10 ** 9,
                receiverAddress: this.model.receiverAddress,
            })
        }
    }

  closeForm() {
    this._matDialogRef.close();
  }

 }
