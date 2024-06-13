import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router){

    this.formLogin = this.fb.group({
      login: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    })
  }

  validarForm(event: Event){
    event.preventDefault();
    if(this.formLogin.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos',
      })
    } else {
      this.realizarLogin();
    }
  }

  realizarLogin(){
    this.authService.login(this.formLogin.value).subscribe({
      next: (res) => {
        this.route.navigate(['/home'])
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao realizar login',
          text: err.error.message
        }).then(()=> this.formLogin.controls['senha'].reset())
      }
    })
  }
}
