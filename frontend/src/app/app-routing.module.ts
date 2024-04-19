import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarBensComponent } from './pages/bem/consultar-bens/consultar-bens.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home', pathMatch: 'full' ,component: HomeComponent
  },
  {path: 'bem', component: ConsultarBensComponent, children: [
    {path: 'consultar-bem', pathMatch: 'full', component: ConsultarBensComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
