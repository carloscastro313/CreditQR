import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister : FormGroup;
  constructor(
    private fb : FormBuilder,
    private auth : LoginService,
    private route : Router,
    private toast : ToastService) {
    this.formRegister = this.fb.group({
      correo: ['',[
        Validators.required,
        Validators.email
      ]],
      clave: ['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      perfil: ['',[
        Validators.required
      ]],
      sexo: ['',[
        Validators.required
      ]]
    });
   }

  ngOnInit() {

  }

  async onSubmit(){
    if(this.formRegister.valid){
      this.formRegister.disable();
      try {
        await this.auth.signIn(this.formRegister.value);
        this.route.navigate(['./home']);
      } catch (error) {
        console.log(error);
        this.toast.presentToast('Cuenta invalida');
      }finally{
        this.formRegister.enable();
      }
    }
  }
}
