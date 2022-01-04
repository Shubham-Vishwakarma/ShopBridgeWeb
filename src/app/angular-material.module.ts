import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSelectModule,
    MatDividerModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSelectModule,
    MatDividerModule
  ]
})

export class AngularMaterialModule {}
