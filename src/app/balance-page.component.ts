import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";

@Component ({
    selector:'balance-page',
    standalone:true,
    imports:[BalanceSectionComponent],
    template:`
    <balance-section></balance-section>
    `
})
export class BalancePage{}
