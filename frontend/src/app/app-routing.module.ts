import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarBensComponent } from './pages/bem/consultar-bens/consultar-bens.component';
import { CadastrarBensComponent } from './pages/bem/cadastrar-bens/cadastrar-bens.component';
import { CadastrarLocalComponent } from './pages/local/cadastrar-local/cadastrar-local.component';
import { ConsultarLocalComponent } from './pages/local/consultar-local/consultar-local.component';
import { CadastrarInventarioComponent } from './pages/inventario/cadastrar-inventario/cadastrar-inventario.component';
import { ConsultarInventarioComponent } from './pages/inventario/consultar-inventario/consultar-inventario.component';
import { CadastrarManutencaoComponent } from './pages/manutencao/cadastrar-manutencao/cadastrar-manutencao.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home', pathMatch: 'full' ,component: HomeComponent
  },
  {path: 'bem', children: [
    {path: 'consultar-bem', pathMatch: 'full', component: ConsultarBensComponent},
    {path: 'cadastrar-bem', pathMatch: 'full', component: CadastrarBensComponent}
  ]},
  {path: 'local', children: [
    // {path: 'consultar-local', pathMatch: 'full', component: ConsultarLocalComponent},
    {path: 'cadastrar-local', pathMatch: 'full', component: CadastrarLocalComponent}
  ]},
  {path: 'inventario', children: [
    {path: 'consultar-inventario', pathMatch: 'full', component: ConsultarInventarioComponent},
    {path: 'cadastrar-inventario', pathMatch: 'full', component: CadastrarInventarioComponent}
  ]},
  {path: 'manutencao', children: [
    {path: 'cadastrar-manutencao', pathMatch: 'full', component: CadastrarManutencaoComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
