import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FooterComponent,
  HeaderComponent,
  HistoryComponent,
} from './components';
import { Moneda } from '@Enums/Moneda';
import { ConversorService } from '@Services/conversor.service';
import { Convertir } from '@Interfaces/IConvertir';
@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    HistoryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly toast = inject(ToastrService);
  private readonly conversorService = inject(ConversorService);
  constructor() {}

  public monedas: Moneda[] = [
    Moneda.COP,
    Moneda.USD,
    Moneda.EUR,
    Moneda.ARS,
    Moneda.MXN,
  ];
  //*Campos del formulario
  public monedaOrigen: string = '';
  public monedaDestino: string = '';
  public cantidad: number = 0;
  public result = computed(() => {
    return this.conversorService.result();
  });
  public conversionsList: Convertir[] = [];
  ngOnInit() {
    this.conversionsList = this.conversorService.conversionsList;
  }
  handleSubmit() {
    if ((this.monedaDestino as Moneda) === (this.monedaOrigen as Moneda)) {
      this.toast.info('Escoge unas monedas diferentes.');
      return;
    }
    if (
      this.monedaDestino.length === 0 ||
      this.monedaOrigen.length === 0 ||
      this.cantidad === 0
    ) {
      this.toast.error('Debes llenar todos los campos');
    } else {
      const model: Convertir = {
        monedaDestino: this.monedaDestino as Moneda,
        monedaOrigen: this.monedaOrigen as Moneda,
        cantidad: this.cantidad,
      };
      this.conversorService.convertir(model);
      this.toast.success(`Resultado: ${this.result()}`);
    }
  }
}
