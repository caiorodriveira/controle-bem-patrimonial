import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Local } from 'src/app/models/Local.model';
import { LocalService } from 'src/app/services/local/local.service';
import Swal from 'sweetalert2';
import { ConsultarBensComponent } from '../../bem/consultar-bens/consultar-bens.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cadastrar-local',
  templateUrl: './cadastrar-local.component.html',
  styleUrls: ['./cadastrar-local.component.scss']
})
export class CadastrarLocalComponent {

  formLocalizacao: FormGroup;
  verLocais: boolean = false;
  locais: Local[] = [];
  tableLocais = new MatTableDataSource<Local>();
  displayedColumns = ['numero', 'tipo', 'descricao', 'bloco', 'edit', 'remove'];
  editar: boolean = false;
  constructor(private fb: FormBuilder, private localService: LocalService) {
    this.formLocalizacao = fb.group({
      id: [null],
      numero: [null, [Validators.required]],
      tipoLocal: ["", [Validators.required]],
      descricao: [null, [Validators.required]],
      bloco: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.buscarLocais();
  }

  buscarLocais() {
    this.localService.buscarTodosLocais().subscribe({
      next: (res) => {
        this.locais = res;
        this.tableLocais.data = this.locais;
      }
    })
  }

  validarForm(edit?: boolean) {
    if (this.formLocalizacao.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos'
      })
    } else {
      edit ?
        this.editarLocal(this.formLocalizacao.value) :
        this.salvarLocal(this.formLocalizacao.value);
    }
  }

  salvarLocal(local: Local) {
    this.localService.salvarLocal(local).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: `Local ${res.descricao} salvo com sucesso`,
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          this.formLocalizacao.reset();
          this.formLocalizacao.controls["tipoLocal"].setValue("");
          this.buscarLocais();
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar local'
        })
      }
    })
  }

  preencherForm(local: Local) {
    this.editar = true;
    this.formLocalizacao.patchValue({
      id: local.id,
      numero: local.numero,
      tipoLocal: local.tipoLocal,
      descricao: local.descricao,
      bloco: local.bloco
    });
    this.locais.splice(this.locais.indexOf(local), 1)
    this.tableLocais.data = this.locais;
  }

  editarLocal(local: Local) {
    this.localService.editarLocal(local).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: `Local ${res.descricao} editado com sucesso`,
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
        }).then(() => {
          this.formLocalizacao.reset();
          this.formLocalizacao.controls["tipoLocal"].setValue("");
          this.buscarLocais();
          this.editar = false;
        })
      }
    })
  }

  confirmarRemocao(local: Local) {
    Swal.fire({
      icon: 'warning',
      title: `Deseja remover o local ${local.descricao}, bloco ${local.bloco}?`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      confirmButtonText: 'Remover'
    }).then(res => {
      if (res.isConfirmed) this.removerLocal(local);
    })
  }

  removerLocal(local: Local) {
    if (local.id) {
      this.localService.removerLocal(local.id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: `Local ${local.descricao} blobo ${local.bloco} removido com sucesso`,
            timer: 3000,
            timerProgressBar: true
          }).then(() => this.buscarLocais());
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: `Erro ao remover local ${local.descricao} bloco ${local.bloco}`
          });
        }

      })
    }
  }

}
