import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubs = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isloading));
  }

  ngOnDestroy() {
    this.uiSubs.unsubscribe();
    console.log('HOla');
  }

  crearCuenta() {
    if (this.registroForm.invalid) return;
    this.store.dispatch(ui.isLoading());

    const { nombre, correo, password } = this.registroForm.value;
    this.store.dispatch(ui.stopLoading());
    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        this.registroForm.reset();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
      });
  }
}
