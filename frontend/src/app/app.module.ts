import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CadastrarInventarioComponent } from './pages/inventario/cadastrar-inventario/cadastrar-inventario.component';
import { ConsultarInventarioComponent } from './pages/inventario/consultar-inventario/consultar-inventario.component';
import { CadastrarBensComponent } from './pages/bem/cadastrar-bens/cadastrar-bens.component';
import { ConsultarBensComponent } from './pages/bem/consultar-bens/consultar-bens.component';
import { ConsultarLocalComponent } from './pages/local/consultar-local/consultar-local.component';
import { CadastrarLocalComponent } from './pages/local/cadastrar-local/cadastrar-local.component';
import { CadastrarManutencaoComponent } from './pages/manutencao/cadastrar-manutencao/cadastrar-manutencao.component';
import { ConsultarManutencaoComponent } from './pages/manutencao/consultar-manutencao/consultar-manutencao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    CadastrarInventarioComponent,
    ConsultarInventarioComponent,
    CadastrarBensComponent,
    ConsultarBensComponent,
    ConsultarLocalComponent,
    CadastrarLocalComponent,
    CadastrarManutencaoComponent,
    ConsultarManutencaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
