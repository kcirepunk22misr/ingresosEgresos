import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresosEgresoComponent } from './ingresos-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresosEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ],
})
export class IngresoEgresoModule {}
