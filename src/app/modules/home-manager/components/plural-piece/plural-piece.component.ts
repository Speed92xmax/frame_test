import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PluralPiecesActionService } from './services/plural-pieces-action.service';
import { PluralPieceControlComponent } from './ui/plural-piece-control/plural-piece-control.component';
import { PluralPieceCanvasComponent } from './ui/plural-piece-canvas/plural-piece-canvas.component';

export interface mLuisaItem {
  color: string;
  height: number;
  width: number;
}

@Component({
  selector: 'plural-piece',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PluralPieceControlComponent,
    PluralPieceCanvasComponent,
  ],
  styles: `
  `,
  template: `
    <div class="h-screen w-full flex justify-between p-10 ">
      <!-- Controles para cada pieza del SVG -->
      <plural-piece-control class="w-1/4" />
      <!-- ViewPort de construcción de cuadro -->
      <plural-piece-canvas class="w-3/4" />
    </div>
  `,
})
export class PluralPieceComponent implements OnInit {
  _pluralAction = inject(PluralPiecesActionService);

  ngOnInit(): void {
    this._pluralAction.updateValues();
    this._pluralAction.updateMaxDimensions();
  }
}
