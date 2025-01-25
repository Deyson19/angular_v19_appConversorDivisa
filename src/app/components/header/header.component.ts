import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="bg-white shadow-lg py-4 stick top-0 z-0">
      <h1 class="text-3xl text-indigo-400 font-bold text-center">
        Conversor de Divisas
      </h1>
    </header>
  `,
})
export class HeaderComponent {}
