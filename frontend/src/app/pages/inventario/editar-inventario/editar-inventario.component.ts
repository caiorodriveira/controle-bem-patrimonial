import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Bem } from 'src/app/models/Bem.model';
import { Inventario } from 'src/app/models/Inventario.model';
import { Local } from 'src/app/models/Local.model';
import { BemService } from 'src/app/services/bem/bem.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { LocalService } from 'src/app/services/local/local.service';
import Swal from 'sweetalert2';

interface BemSelecionar {
  bem: Bem
  selecionado: boolean
}

@Component({
  selector: 'app-editar-inventario',
  templateUrl: './editar-inventario.component.html',
  styleUrls: ['./editar-inventario.component.scss']
})
export class EditarInventarioComponent {

  bens: Bem[] = [];
  bensSelecionados: Bem[] = [];
  tableBem = new MatTableDataSource<BemSelecionar>();
  locais: Local[] = [];
  formInventario: FormGroup;
  locaisFiltrados!: Observable<Local[]>;
  localSelecionado: Local | undefined;
  displayedColumns = ['codigo', 'nome', 'status', 'local', 'adicionar'];
  selecionarTodosBens: boolean = false;
  primeiraInteracao: boolean = true;


  constructor(private fb: FormBuilder, private inventarioService: InventarioService, private bemService: BemService, private localService: LocalService, @Inject(MAT_DIALOG_DATA) public inventario: Inventario, public dialogRef: MatDialogRef<EditarInventarioComponent>) {

    this.formInventario = fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      valorTotal: [null],
      local: [null, [Validators.required]],
    })

    this.locaisFiltrados = this.formInventario.controls["local"].valueChanges.pipe(
      startWith(''),
      map(valor => this.filtrarLocais(valor || ''))
    )

    this.formInventario.patchValue({
      id: inventario.id,
      nome: inventario.nome,
      valorTotal: inventario.valorTotal,
      local: inventario.local.descricao
    })

  }

  ngOnInit(): void {
    this.buscarLocais();
    this.localSelecionado = this.inventario.local
    if (this.inventario.local.id) {
      this.bemService.buscarBensPorLocal(this.inventario.local.id).subscribe({
        next: (res) => {
          this.bens = res;
          let bensSelecionar: BemSelecionar[] = [];
          this.bens.forEach(bem => {
            bensSelecionar.push({ bem, selecionado: true });
          })
          this.tableBem.data = bensSelecionar;
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
    this.bensSelecionados = this.inventario.bens
  }

  filtrarLocais(valor: string) {
    const valorFiltrado = valor.toString().toLowerCase();

    return this.locais.filter(local => local.descricao.toLowerCase().includes(valorFiltrado || ''))
  }

  selecionarLocal(eventLocalSelecionado: String) {
    this.localSelecionado = this.locais.find(local => local.descricao == eventLocalSelecionado);
    this.bensSelecionados = [];
    this.localSelecionado?.id ? this.buscarBensPorLocal(this.localSelecionado.id) : null;
    this.selecionarTodosBens = true;
  }

  validarForm() {
    if (this.formInventario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos'
      })
    } else if (this.bensSelecionados.length < 2 && this.bens.length >= 2) {
      Swal.fire({
        icon: 'error',
        title: 'Selecione ao minímo 2 bens'
      })
    } else if (this.bensSelecionados.length == 0 && this.bens.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Selecione ao minímo algum bem'
      })
    } else {
      this.editarInventario();
    }
  }

  editarInventario() {
    let aux;
    if (this.localSelecionado) {
      aux = {
        id: this.formInventario.value.id,
        nome: this.formInventario.value.nome,
        data: new Date(),
        local: this.localSelecionado,
        valorTotal: 0,
        dataUltimaEdicao: new Date(),
        bens: this.bensSelecionados
      };

    }
    const inventario = aux as Inventario;

    this.inventarioService.editarInventatio(inventario).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Inventário cadastrado com sucesso!',
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          this.formInventario.reset();
          this.bens = [];
          this.dialogRef.close()
        })
      }
    })
  }

  selecionarTodosBensLocal() {
    this.bensSelecionados = [];
    this.bens.forEach(bem => {
      const inputBemSelecionado = document.getElementById('bem-' + bem?.id + '-selecionar') as HTMLInputElement;
      this.bensSelecionados.push(bem);
      inputBemSelecionado.checked = true;
    })
    this.selecionarTodosBens = false;
  }

  removerSelecaoTodosBensLocal() {
    this.bens.forEach(bem => {
      const inputBemSelecionado = document.getElementById('bem-' + bem?.id + '-selecionar') as HTMLInputElement;
      this.bensSelecionados = [];
      inputBemSelecionado.checked = false;
    })
    this.selecionarTodosBens = true;
  }


  adicionarRemoverBem(bem: Bem) {
    const inputBemSelecionado = document.getElementById('bem-' + bem?.id + '-selecionar') as HTMLInputElement;

    if (inputBemSelecionado.checked) {
      this.bensSelecionados.push(bem);
    } else {
      this.bensSelecionados.splice(this.bensSelecionados.indexOf(bem), 1);
    }
  }

  buscarLocais() {
    this.localService.buscarTodosLocais().subscribe({
      next: (res) => {
        this.locais = res
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  buscarBensPorLocal(idLocal: number) {
    this.primeiraInteracao = false;
    this.bemService.buscarBensPorLocal(idLocal).subscribe({
      next: (res) => {
        this.bens = res;
        let bensSelecionar: BemSelecionar[] = [];
        this.bens.forEach(bem => {
          bensSelecionar.push({ bem, selecionado: true });
        })
        this.tableBem.data = bensSelecionar;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
