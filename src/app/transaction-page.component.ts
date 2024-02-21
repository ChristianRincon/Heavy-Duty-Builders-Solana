import { Component } from "@angular/core";
import { TransactionSectionComponent } from "./transaction-section.component";

@Component ({
    selector:'balance-page',
    standalone:true,
    imports:[TransactionSectionComponent],
    template:`
    <transaction-section></transaction-section>
    `
})
export class TransactionPage{}
