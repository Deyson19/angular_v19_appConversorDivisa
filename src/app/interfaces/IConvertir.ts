import { Moneda } from '../enum/Moneda';

export interface Convertir {
  cantidad: number;
  monedaOrigen: Moneda;
  monedaDestino: Moneda;
}
