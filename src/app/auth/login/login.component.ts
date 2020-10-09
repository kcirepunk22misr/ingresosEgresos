import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubs = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isloading;
    });
  }

  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { email, password } = this.loginForm.value;

    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this.authService
      .loginUsuario(email, password)
      .then(() => {
        this.loginForm.reset();
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Credenciales invalidas',
          text: err.message,
        });
      });
  }
}
