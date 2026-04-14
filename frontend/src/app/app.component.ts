import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>people</mat-icon>
      <span style="margin-left: 8px;">Employee Management System</span>
    </mat-toolbar>
    <div class="page-container">
      <router-outlet />
    </div>
  `,
  styles: [`
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }
  `]
})
export class AppComponent {}
