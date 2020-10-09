import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  usuario: string = '';
  usuarioSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioSubs = this.store
      .select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => {
        this.usuario = user.nombre;
      });
  }

  ngOnDestroy() {
    this.usuarioSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
