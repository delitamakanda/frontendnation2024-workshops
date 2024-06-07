import { Component } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    RouterOutlet
  ],
  templateUrl: "app.component.html"
})
export class AppComponent {
}
