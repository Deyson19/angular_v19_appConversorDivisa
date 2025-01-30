import { Injectable, signal } from '@angular/core';
import { Moneda } from '@Enums/Moneda';
import { Convertir, Exchange } from '@Interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  public result = signal(0);
  private readonly exchangeUrl: string =
    'https://api.exchangerate-api.com/v4/latest';

  public conversionsList: Convertir[] = [];
  constructor() {}

  public async convertir(model: Convertir) {
    const price = await this.GetPrice(model.monedaOrigen, model.monedaDestino);
    let result = 0;
    if (price > model.cantidad) {
      result = price / model.cantidad;
    } else {
      result = model.cantidad / price;
    }
    const conversion: Convertir = {
      cantidad: model.cantidad,
      monedaOrigen: model.monedaOrigen,
      monedaDestino: model.monedaDestino,
      total: result,
    };
    this.conversionsList.push(conversion);
    this.result.set(result);
  }

  private async GetPrice(monedaOrigen: Moneda, monedaDestino: Moneda) {
    const request = await fetch(`${this.exchangeUrl}/${monedaDestino}`);
    if (request.status === 200) {
      const data = (await request.json()) as Exchange;
      const price = data.rates![monedaOrigen];
      return price;
    }
    return 0;
  }
}
