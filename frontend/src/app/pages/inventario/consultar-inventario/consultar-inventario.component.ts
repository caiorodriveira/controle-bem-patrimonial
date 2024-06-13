import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inventario } from 'src/app/models/Inventario.model';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import Swal from 'sweetalert2';
import { EditarInventarioComponent } from '../editar-inventario/editar-inventario.component';

@Component({
  selector: 'app-consultar-inventario',
  templateUrl: './consultar-inventario.component.html',
  styleUrls: ['./consultar-inventario.component.scss']
})
export class ConsultarInventarioComponent {
  inventarios: Inventario[] = [];
  tableInventario = new MatTableDataSource<Inventario>();
  displayedColumns = ['codigo', 'nome', 'local', 'valorTotal', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private inventarioService: InventarioService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.buscarTodosInventarios();
  }

  ngAfterViewInit(): void {
    this.tableInventario.paginator = this.paginator;
  }

  buscarTodosInventarios() {
    this.inventarioService.buscarTodosInventarios().subscribe({
      next: (res) => {
        this.inventarios = res;
        this.tableInventario.data = this.inventarios;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  confirmarRemocao(inventario: Inventario) {
    Swal.fire({
      icon: 'warning',
      title: `Deseja remover o inventário ${inventario.nome}?`,
      confirmButtonText: 'Remover',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if (res.isConfirmed) this.removerInventario(inventario);
    })
  }

  removerInventario(inventario: Inventario) {
    if (inventario.id) {
      this.inventarioService.removerInventario(inventario.id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: `Inventário ${inventario.nome} removido com sucesso`,
            timer: 3000,
            timerProgressBar: true
          }).then(() => this.buscarTodosInventarios())
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: `Erro ao remover ivnentário ${inventario.nome}`,
          })
        }
      })
    }
  }

  abrirEdicao(inventario: Inventario) {
    const dialogRef = this.dialog.open(EditarInventarioComponent, { data: inventario });

    dialogRef.afterClosed().subscribe(
      () => this.buscarTodosInventarios()
    )
  }

  filtrarInventarios(value: string) {
    this.tableInventario.filter = value;
  }

}
