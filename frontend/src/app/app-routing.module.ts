import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultarBensComponent } from './pages/bem/consultar-bens/consultar-bens.component';
import { CadastrarBensComponent } from './pages/bem/cadastrar-bens/cadastrar-bens.component';
import { CadastrarLocalComponent } from './pages/local/cadastrar-local/cadastrar-local.component';
import { CadastrarInventarioComponent } from './pages/inventario/cadastrar-inventario/cadastrar-inventario.component';
import { ConsultarInventarioComponent } from './pages/inventario/consultar-inventario/consultar-inventario.component';
import { CadastrarManutencaoComponent } from './pages/manutencao/cadastrar-manutencao/cadastrar-manutencao.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthAlunoGuard } from './guards/authAluno/auth-aluno.guard';
import { NaoAutorizadoComponent } from './components/nao-autorizado/nao-autorizado.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home', pathMatch: 'full', canActivate: [AuthAlunoGuard], component: HomeComponent
  },
  {
    path: 'login', pathMatch: 'full', component: LoginComponent
  },
  {path: 'bem', canActivate: [AuthAlunoGuard] ,children: [
    {path: 'consultar-bem', pathMatch: 'full', component: ConsultarBensComponent},
    {path: 'cadastrar-bem', pathMatch: 'full', component: CadastrarBensComponent}
  ]},
  {path: 'local', canActivate: [AuthGuard], children: [
    {path: '', pathMatch: 'full', component: CadastrarLocalComponent}
  ]},
  {path: 'inventario', canActivate: [AuthGuard], children: [
    {path: 'consultar-inventario', pathMatch: 'full', component: ConsultarInventarioComponent},
    {path: 'cadastrar-inventario', pathMatch: 'full', component: CadastrarInventarioComponent}
  ]},
  {path: 'manutencao', canActivate: [AuthGuard], children: [
    {path: '', pathMatch: 'full', component: CadastrarManutencaoComponent}
  ]},
  {
    path: 'nao-autorizado', pathMatch: 'full', component: NaoAutorizadoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
