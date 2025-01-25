import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Moneda } from './enum/Moneda';
import { ConversorService } from './services/conversor.service';
import { Convertir } from './interfaces/IConvertir';
import { FooterComponent, HeaderComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly toast = inject(ToastrService);
  private readonly conversorService = inject(ConversorService);
  constructor() {}

  public monedas: Moneda[] = [Moneda.COP, Moneda.USD, Moneda.EUR];
  //*Campos del formulario
  public monedaOrigen: string = '';
  public monedaDestino: string = '';
  public cantidad: number = 0;
  public result = computed(() => {
    return this.conversorService.result();
  });

  handleSubmit() {
    if (this.monedaDestino === this.monedaOrigen) {
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
