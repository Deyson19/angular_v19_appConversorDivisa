import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div class="bg-gray-700">
      <div class="max-w-2xl mx-auto text-white py-10">
        <div class="text-center">
          <h2 class="text-3xl mb-5">Realizar Conversión de Divisas</h2>
          <p class="font-bold text-amber-400">Angular v19 - Tailwind v4.0</p>
        </div>
      </div>
    </div>
  `,
})
export class FooterComponent {}
