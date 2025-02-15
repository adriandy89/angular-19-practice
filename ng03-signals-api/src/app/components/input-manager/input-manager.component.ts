import { Component, contentChildren } from '@angular/core';
import { ManagedInputDirective } from './managed-input.directive';

@Component({
  selector: 'app-input-manager',
  standalone: true,
  imports: [],
  templateUrl: './input-manager.component.html',
  styleUrl: './input-manager.component.css',
})
export class InputManagerComponent {
  // add a proper content query (hint, use the ManagedInputDirective)
  readonly inputDirective = contentChildren(ManagedInputDirective);

  clearAll() {
    // use the content query to clear all inputs
    this.inputDirective().forEach((input) => (input.inputElement.value = ''));
  }
}
