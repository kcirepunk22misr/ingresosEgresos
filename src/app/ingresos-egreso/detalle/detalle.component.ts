import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresoSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  ngOnDestroy() {
    this.ingresoSubs.unsubscribe();
  }

  borrar(id: string) {
    this.ingresoEgresoService
      .borrarIngresosEgresos(id)
      .then(() => {
        Swal.fire('Borrado', 'Item Borrado', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  }
}
