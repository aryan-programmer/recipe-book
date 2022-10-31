import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {$404Component} from "./404.component";

const routes: Routes = [
	{path: '404', component: $404Component},
	{path: '**', component: $404Component},
]

@NgModule({
	declarations: [$404Component],
	imports: [RouterModule.forChild(routes)]
})
export class $404Module {

}
