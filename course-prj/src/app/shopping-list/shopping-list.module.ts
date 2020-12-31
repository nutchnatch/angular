import { NgModule } from "@angular/core";
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: "shopping-list", component: ShoppingListComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule {

}