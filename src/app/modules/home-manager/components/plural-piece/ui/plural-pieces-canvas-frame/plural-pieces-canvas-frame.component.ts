import { Component, inject } from '@angular/core';
import { PluralPiecesStateService } from '../../services/plural-pieces-state.service';

@Component({
  selector: 'plural-pieces-canvas-frame',
  standalone: true,
  imports: [],
  template: `
    <!-- INFO: imagen superior vertical  -->
    <img
      class="img-marco"
      [width]="
        _pluralState.frameThick
          ? _pluralState.totalArtMLuisaWidth + _pluralState.frameThick * 2
          : 0
      "
      [height]="_pluralState.frameThick"
      [style]="
        'left: -' +
        _pluralState.frameThick +
        'px; top: -' +
        _pluralState.frameThick +
        'px; z-index: 2; aspect-ratio: ' +
        (_pluralState.totalArtMLuisaWidth + _pluralState.frameThick * 2) /
          _pluralState.frameThick +
        '; clip-path: polygon(0 0, 100% 0, ' +
        (_pluralState.totalArtMLuisaWidth + _pluralState.frameThick) +
        'px 100%, ' +
        _pluralState.frameThick +
        'px 100%);'
      "
      src="../../../../../assets/frames/image 1.png"
      alt="xMidYMid slice"
    />
    <!-- INFO: imagen inferior vertical  -->
    <img
      class="img-marco"
      [width]="
        _pluralState.frameThick
          ? _pluralState.totalArtMLuisaWidth + _pluralState.frameThick * 2
          : 0
      "
      [height]="_pluralState.frameThick"
      [style]="
        'left: -' +
        _pluralState.frameThick +
        'px; bottom: -' +
        _pluralState.frameThick +
        'px; z-index: 2; aspect-ratio: ' +
        (_pluralState.totalArtMLuisaWidth + _pluralState.frameThick * 2) /
          _pluralState.frameThick +
        '; clip-path: polygon(' +
        _pluralState.frameThick +
        'px 0, ' +
        (_pluralState.totalArtMLuisaWidth + _pluralState.frameThick) +
        'px 0, 100% 100%, 0% 100%); max-width: none;'
      "
      src="../../../../../assets/frames/image 1.png"
      alt="xMidYMid slice"
    />
    <!-- INFO: imagen lateral izquierda  -->
    <img
      class="img-marco rotate-90"
      [style]="
        'top: -' +
        _pluralState.frameThick +
        'px; left: -' +
        _pluralState.frameThick +
        'px; z-index: 1; width:' +
        _pluralState.totalCanvasHeight +
        'px; height:' +
        +_pluralState.frameThick +
        'px; ' +
        'aspect-ratio: ' +
        this._pluralState.artHeight / _pluralState.frameThick +
        '; transform-origin: ' +
        _pluralState.frameThick / 2 +
        'px ' +
        _pluralState.frameThick / 2 +
        'px;'
      "
      src="../../../../../assets/frames/image 1.png"
      alt="xMidYMid slice"
    />
    <!-- INFO: imagen lateral derecha  -->
    <img
      class="img-marco"
      [style]="
        'bottom: -' +
        _pluralState.frameThick * 2 +
        'px;
               left: ' +
        _pluralState.totalArtMLuisaWidth +
        'px; z-index: 1; transform: rotate(270deg);' +
        'width:' +
        _pluralState.totalCanvasHeight +
        'px; height:' +
        +_pluralState.frameThick +
        'px; ' +
        'aspect-ratio: ' +
        (this._pluralState.artHeight + _pluralState.frameThick * 2) /
          _pluralState.frameThick +
        '; transform-origin: ' +
        0 +
        '% ' +
        0 +
        '%;'
      "
      src="../../../../../assets/frames/image 1.png"
      alt="xMidYMid slice"
    />
  `,
  styles: `
  .img-marco {
  position: absolute;
  max-width: none;
}
`,
})
export class PluralPiecesCanvasFrameComponent {
  _pluralState = inject(PluralPiecesStateService).store;
}
