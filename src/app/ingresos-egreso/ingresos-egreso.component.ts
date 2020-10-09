import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresos-egreso',
  templateUrl: './ingresos-egreso.component.html',
  styles: [],
})
export class IngresosEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo: string = 'ingreso';

  constructor(
    private fb: FormBuilder,
    private ingresoEgrasoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  guardar() {
    if (this.ingresoForm.invalid) return;

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgrasoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        this.ingresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  }
}
