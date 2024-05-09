import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bem } from 'src/app/models/Bem.model';
import { Local } from 'src/app/models/Local.model';
import { BemService } from 'src/app/services/bem/bem.service';
import { LocalService } from 'src/app/services/local/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-bem',
  templateUrl: './editar-bem.component.html',
  styleUrls: ['./editar-bem.component.scss']
})
export class EditarBemComponent {

  formBem: FormGroup;
  locais: Local[] = [];
  constructor(private fb: FormBuilder, private bemService: BemService, private localService: LocalService, @Inject(MAT_DIALOG_DATA) public bem: Bem, public dialogRef: MatDialogRef<EditarBemComponent>) {


    this.formBem = fb.group({
      id: [null],
      codigo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      valorInicial: [null],
      valorAtual: [null],
      local: ["", [Validators.required]],
      estadoBem: ["", [Validators.required]],
      alugado: [null],
      valorAluguel: [null]
    })

    this.formBem.patchValue({
      id: bem.id,
      codigo: bem.codigo,
      descricao: bem.descricao,
      valorInicial: bem.valorInicial,
      valorAtual: bem.valorAtual,
      local: "",
      estadoBem: bem.estadoBem,
      alugado: bem.alugado,
      valorAluguel: bem.valorAluguel
    })
  }

  ngOnInit(): void {
    this.buscarLocais();
  }

  validarForm() {
    if (this.formBem.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos'
      })
    } else {
      this.editarBem(this.formBem.value);
    }
  }

  editarBem(bem: Bem) {
    this.bemService.editarBem(bem).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Bem editado com sucesso!',
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          this.dialogRef.close(bem);
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao editar bem'
        });
      }
    })
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

}
