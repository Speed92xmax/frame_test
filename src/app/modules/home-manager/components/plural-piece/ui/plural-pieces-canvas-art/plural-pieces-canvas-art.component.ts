import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PluralPiecesStateService } from '../../services/plural-pieces-state.service';

@Component({
  selector: 'plural-pieces-canvas-art',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      src="../../../../../assets/art-samples/art2.jpg"
      alt=""
      [ngStyle]="{
        height: _pluralState.artHeight + 'px',
        width: _pluralState.artWidth + 'px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        position: 'absolute'
      }"
    />
  `,
  styles: ``,
})
export class PluralPiecesCanvasArtComponent {
  _pluralState = inject(PluralPiecesStateService).store;
}
