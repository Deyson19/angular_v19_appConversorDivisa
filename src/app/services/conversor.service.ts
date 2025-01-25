import { Injectable, signal } from '@angular/core';
import { Convertir } from '../interfaces/IConvertir';
import { Moneda } from '../enum/Moneda';
import { PrecioMoneda } from '../helpers/precioMoneda';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  public result = signal(0);
  constructor() {}

  public convertir(model: Convertir) {
    switch (model.monedaOrigen) {
      case Moneda.COP:
        this.convertFromCOP(model);
        break;
      case Moneda.USD:
        this.convertFromUSD(model);
        break;
      case Moneda.EUR:
        this.convertFromEUR(model);
        break;
      default:
        console.log('No se ha seleccionado una moneda');
        break;
    }
  }

  private convertFromCOP(model: Convertir): void {
    const conversionRates = {
      [Moneda.USD]: PrecioMoneda.CopToUsd,
      [Moneda.EUR]: PrecioMoneda.CopToEuro,
    };
    //*realizar conversion
    this.buildConversion(model, conversionRates);
  }

  private convertFromUSD(model: Convertir): void {
    const conversionRates = {
      [Moneda.COP]: PrecioMoneda.UsdToCop,
      [Moneda.EUR]: PrecioMoneda.UsdToEuro,
    };
    //*realizar conversion
    this.buildConversion(model, conversionRates);
  }

  private convertFromEUR(model: Convertir): void {
    const conversionRates = {
      [Moneda.COP]: PrecioMoneda.EuroToCop,
      [Moneda.USD]: PrecioMoneda.EuroToUsd,
    };
    //*realizar conversion
    this.buildConversion(model, conversionRates);
  }
  private buildConversion(
    model: Convertir,
    rates: { [key: string]: () => number }
  ) {
    const conversion = rates[model.monedaDestino];
    if (conversion) {
      const result = model.cantidad * conversion();
      this.result.set(result);
    } else {
      console.error('No hay conversion disponible');
    }
  }
}
