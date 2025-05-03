import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin:FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required,Validators.email]),
    password:  new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z].{5,}$/)]),
  })

  constructor(private _loginService:LoginService, private Router:Router){}


  login() {
    debugger
    console.log(this.formLogin);
    if(this.formLogin.invalid) {
      this._loginService.login(this.formLogin.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);

          this.Router.navigate(['/home']);
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        }
      })

    }
  }
}
