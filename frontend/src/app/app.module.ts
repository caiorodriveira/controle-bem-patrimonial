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
import { CadastrarLocalComponent } from './pages/local/cadastrar-local/cadastrar-local.component';
import { CadastrarManutencaoComponent } from './pages/manutencao/cadastrar-manutencao/cadastrar-manutencao.component';
import { ConsultarManutencaoComponent } from './pages/manutencao/consultar-manutencao/consultar-manutencao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarBemComponent } from './pages/bem/editar-bem/editar-bem.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditarInventarioComponent } from './pages/inventario/editar-inventario/editar-inventario.component';
import { ScanearBemComponent } from './pages/bem/scanear-bem/scanear-bem.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import {MatMenuModule} from '@angular/material/menu';
import { NaoAutorizadoComponent } from './components/nao-autorizado/nao-autorizado.component';

LOAD_WASM().subscribe();

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
    CadastrarLocalComponent,
    CadastrarManutencaoComponent,
    ConsultarManutencaoComponent,
    EditarBemComponent,
    EditarInventarioComponent,
    ScanearBemComponent,
    NaoAutorizadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // material
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgxScannerQrcodeModule,
    MatMenuModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
