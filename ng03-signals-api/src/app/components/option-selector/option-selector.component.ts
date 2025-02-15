import { Component, contentChild, input, model, signal } from '@angular/core';
import { OptionDirective } from './option.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-selector',
  imports: [CommonModule],
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css',
})
export class OptionSelectorComponent {
  readonly options = input.required<string[]>();

  readonly templateDirective = contentChild(OptionDirective);

  readonly selected = model.required<string>();

  select(option: string) {
    this.selected.set(option);
  }
}
