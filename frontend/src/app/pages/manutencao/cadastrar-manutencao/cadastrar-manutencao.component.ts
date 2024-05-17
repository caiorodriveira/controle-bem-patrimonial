import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Bem } from 'src/app/models/Bem.model';
import { Manutencao } from 'src/app/models/Manutencao.model';
import { BemService } from 'src/app/services/bem/bem.service';
import { ManutencaoService } from 'src/app/services/manutencao/manutencao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-manutencao',
  templateUrl: './cadastrar-manutencao.component.html',
  styleUrls: ['./cadastrar-manutencao.component.scss']
})
export class CadastrarManutencaoComponent {
  formManutencao: FormGroup;
  verManutencoes: boolean = false;
  manutencoes: Manutencao[] = [];
  tableManutencoes = new MatTableDataSource<Manutencao>();
  displayedColumns = ['id', 'motivo', 'valor', 'bem', 'edit', 'remove'];
  editar: boolean = false;
  manutencaoEditando: Manutencao | undefined;
  bens: Bem[] = [];
  constructor(private fb: FormBuilder, private manutencaoService: ManutencaoService, private bemservice: BemService) {
    this.formManutencao = fb.group({
      id: [null],
      motivo: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      bem: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      data: [null, [Validators.required]],
      notaFiscal: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.buscarManutencoes();
    this.buscarTodosBens();
  }

  buscarManutencoes() {
    this.manutencaoService.buscarTodasManutencoes().subscribe({
      next: (res) => {
        this.manutencoes = res;
        this.tableManutencoes.data = this.manutencoes;
      }
    })
  }

  validarForm(edit?: boolean) {
    if (this.formManutencao.invalid) {
      console.log(this.formManutencao.controls)
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos'
      })
    } else {
      if (edit) {
        this.manutencaoEditando = this.formManutencao.value;
        this.editarManutencao(this.formManutencao.value)
      } else {
        this.salvarManutencao(this.formManutencao.value);
      }

    }
  }

  salvarManutencao(manutencao: Manutencao) {
    this.manutencaoService.salvarManutencao(manutencao).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: `Manutenção salva com sucesso`,
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          this.formManutencao.reset();
          this.formManutencao.controls["bem"].setValue("");
          this.formManutencao.controls["estado"].setValue("");
          this.buscarManutencoes();
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar manutencao'
        })
      }
    })
  }

  preencherForm(manutencao: Manutencao) {
    this.editar = true;
    if (this.manutencaoEditando != undefined) Swal.fire({ icon: 'warning', title: 'Finalize a edição anterior' })
    else {
      this.manutencaoEditando = manutencao;
      this.formManutencao.patchValue({
        id: manutencao.id,
        motivo: manutencao.motivo,
        valor: manutencao.valor,
        bem: manutencao.bem,
        estado: manutencao.estado,
        data: manutencao.data,
        notaFiscal: manutencao.notaFiscal
      });
      this.manutencoes.splice(this.manutencoes.indexOf(manutencao), 1)
      this.tableManutencoes.data = this.manutencoes;
    }
  }

  editarManutencao(manutencao: Manutencao) {
    this.manutencaoService.editarManutencao(manutencao).subscribe({
      next: (res) => {
        this.manutencaoEditando = undefined;
        Swal.fire({
          icon: 'success',
          title: `Manutenção editada com sucesso`,
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
        }).then(() => {
          this.formManutencao.reset();
          this.formManutencao.controls["bem"].setValue("");
          this.formManutencao.controls["estado"].setValue("");
          this.buscarManutencoes();
          this.editar = false;
        })
      }
    })
  }

  confirmarRemocao(manutencao: Manutencao) {
    Swal.fire({
      icon: 'warning',
      title: `Deseja remover a manutencção?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Remover'
    }).then(res => {
      if (res.isConfirmed) this.removerManutencao(manutencao);
    })
  }

  removerManutencao(manutencao: Manutencao) {
    if (manutencao.id) {
      this.manutencaoService.removerManutencao(manutencao.id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: `Manutenção removida com sucesso`,
            timer: 3000,
            timerProgressBar: true
          }).then(() => this.buscarManutencoes());
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: `Erro ao remover manutenção de id ${manutencao.id}`
          });
        }

      })
    }
  }

  retornarValores(manutencao: Manutencao) {
    this.manutencoes.push(manutencao);
    this.tableManutencoes.data = this.manutencoes;
    this.manutencaoEditando = undefined;
    this.formManutencao.reset();
    this.formManutencao.controls["bem"].setValue("");
    this.formManutencao.controls["estado"].setValue("");
    this.editar = false;
  }

  buscarTodosBens() {
    this.bemservice.buscarTodosBens().subscribe({
      next: (res) => {
        this.bens = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
