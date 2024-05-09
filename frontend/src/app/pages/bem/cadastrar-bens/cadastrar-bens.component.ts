import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bem } from 'src/app/models/Bem.model';
import { Local } from 'src/app/models/Local.model';
import { BemService } from 'src/app/services/bem/bem.service';
import { LocalService } from 'src/app/services/local/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-bens',
  templateUrl: './cadastrar-bens.component.html',
  styleUrls: ['./cadastrar-bens.component.scss']
})
export class CadastrarBensComponent {

  formBem: FormGroup;
  locais: Local[] = [];
  constructor(private fb: FormBuilder, private bemService: BemService, private localService: LocalService){

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
  }

  ngOnInit(): void {
    this.buscarLocais();
  }

  validarForm(){
    if(this.formBem.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos'
      })
    } else {
      this.salvarBem(this.formBem.value);
    }
  }

  salvarBem(bem: Bem){
    this.bemService.salvarBem(bem).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Bem salvo com sucesso!',
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          this.formBem.reset();
          this.formBem.controls["local"].setValue("");
        })
      }
    })
  }

  buscarLocais(){
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
