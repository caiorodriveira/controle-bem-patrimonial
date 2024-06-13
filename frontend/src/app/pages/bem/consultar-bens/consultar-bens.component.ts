import { BemService } from 'src/app/services/bem/bem.service';
import { Component, ViewChild } from '@angular/core';
import { Bem } from 'src/app/models/Bem.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarBemComponent } from '../editar-bem/editar-bem.component';
import { MatPaginator } from '@angular/material/paginator';
import { ScanearBemComponent } from '../scanear-bem/scanear-bem.component';

@Component({
  selector: 'app-consultar-bens',
  templateUrl: './consultar-bens.component.html',
  styleUrls: ['./consultar-bens.component.scss']
})
export class ConsultarBensComponent {
  bens: Bem[] = [];
  tableBem = new MatTableDataSource<Bem>();
  displayedColumns = ['codigo', 'nome', 'status', 'local', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private bemService: BemService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.buscarTodosBens();
  }

  ngAfterViewInit(): void {
    this.tableBem.paginator = this.paginator;
  }

  buscarTodosBens() {
    this.bemService.buscarTodosBens().subscribe({
      next: (res) => {
        this.bens = res;
        this.tableBem.data = this.bens;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  confirmarRemocao(bem: Bem) {
    Swal.fire({
      icon: 'warning',
      title: `Deseja remover o bem ${bem.descricao} | ${bem.codigo}, local ${bem.local.descricao}?`,
      confirmButtonText: 'Remover',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if (res.isConfirmed) this.removerBem(bem);
    })
  }

  removerBem(bem: Bem) {
    if (bem.id) {
      this.bemService.removerBem(bem.id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: `Bem ${bem.descricao} | ${bem.codigo} removido com sucesso`,
            timer: 3000,
            timerProgressBar: true
          }).then(() => this.buscarTodosBens())
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: `Erro ao remover bem ${bem.descricao} | ${bem.codigo}`,
          })
        }
      })
    }
  }

  abrirEdicao(bem: Bem) {
    const dialogRef = this.dialog.open(EditarBemComponent, { data: bem });

    dialogRef.afterClosed().subscribe(
      () => this.buscarTodosBens()
    )
  }

  filtrarBens(value: string) {
    this.tableBem.filter = value;
  }

  abrirScan(){
    this.dialog.open(ScanearBemComponent, {data: true});
  }

}
