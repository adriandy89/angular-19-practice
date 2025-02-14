import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-immutability',
  imports: [],
  templateUrl: './immutability.component.html',
  styleUrl: './immutability.component.css',
})
export class ImmutabilityComponent {
  readonly names = signal(['Alice', 'Bob', 'Charlie']);
  readonly person = signal({ name: 'Alice', age: 30 });

  constructor() {
    setTimeout(() => {
      // this.names().push('David'); // BAD way to update the signal
      this.names.update((names) => [...names, 'David']); // GOOD way to update the signal
      // this.names.update(names => names); // BAD way to update the signal

      this.person.update((person) => ({ ...person, name: 'David' }));

      console.log('Adding David to the list of names', this.names());
    }, 2000);

    effect(() => {
      console.log('Person changed', this.person());
    });
  }
}
