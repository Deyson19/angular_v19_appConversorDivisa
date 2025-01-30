import { Component, input } from '@angular/core';
import { Convertir } from '../../interfaces/IConvertir';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  public conversionsHistory = input.required<Convertir[]>();
}
