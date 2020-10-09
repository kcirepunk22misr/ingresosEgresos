import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingreso: number = 0;
  egresos: number = 0;
  TotalEgresos: number = 0;
  TotalIngresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateWithIngreso>) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.generarEstadistica(items);
    });
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.TotalEgresos = 0;
    this.TotalIngresos = 0;
    this.ingreso = 0;
    this.egresos = 0;
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.TotalIngresos += item.monto;
        this.ingreso++;
      } else {
        this.TotalEgresos += item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.TotalIngresos, this.TotalEgresos]];
  }
}
