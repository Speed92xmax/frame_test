import { Component, inject, Input } from '@angular/core';
import { PluralPiecesStateService } from '../../services/plural-pieces-state.service';
import { CommonModule } from '@angular/common';
import { PluralPiecesActionService } from '../../services/plural-pieces-action.service';

@Component({
  selector: 'plural-pieces-canvas-intraframe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-pink-300 "
      [ngStyle]="{
        top: '-10px',
        left: '-10px',
        position: 'absolute',
        zIndex: index - 1,
        width: frameThick + 'px',
        height: frameThick + 'px'
      }"
    ></div>

    <!--     <img
      class="img-marco"
      [width]="
        this._pluralState.newMLuisaItem.frameThick
          ? mLuisaWidth +
            _pluralState.totalArtMLuisaWidth +
            this._pluralState.newMLuisaItem.frameThick * 2
          : 0
      "
      [height]="_pluralState.newMLuisaItem.frameThick"
      [style]="
        'left: -' +
        _pluralState.newMLuisaItem.frameThick +
        'px; top: -' +
        _pluralState.newMLuisaItem.frameThick +
        'px; z-index:' +
        index +
        '; aspect-ratio: ' +
        (mLuisaWidth +
          _pluralState.totalArtMLuisaWidth +
          _pluralState.newMLuisaItem.frameThick * 2) /
          _pluralState.newMLuisaItem.frameThick +
        '; clip-path: polygon(0 0, 100% 0, ' +
        (mLuisaWidth +
          _pluralState.totalArtMLuisaWidth +
          _pluralState.newMLuisaItem.frameThick) +
        'px 100%, ' +
        _pluralState.frameThick +
        'px 100%);'
      "
      src="../../../../../assets/frames/image 1.png"
      alt="xMidYMid slice"
    /> -->
    <!-- INFO: imagen inferior vertical  -->
    <!--   <img
      class="img-marco"
      [width]="
        _pluralState.frameThick
          ? mLuisaWidth +
            _pluralState.totalArtMLuisaWidth +
            _pluralState.frameThick * 2
          : 0
      "
      [height]="_pluralState.frameThick"
      [style]="
        'left: -' +
        _pluralState.frameThick +
        'px; bottom: -' +
        _pluralState.frameThick +
        'px; z-index: 2; aspect-ratio: ' +
        (mLuisaWidth +
          _pluralState.totalArtMLuisaWidth +
          _pluralState.frameThick * 2) /
          _pluralState.frameThick +
        '; clip-path: polygon(' +
        _pluralState.frameThick +
        'px 0, ' +
        (mLuisaWidth +
          _pluralState.totalArtMLuisaWidth +
          _pluralState.frameThick) +
        'px 0, 100% 100%, 0% 100%); max-width: none;'
      "
      src="../../../../../assets/frames/image 1.png"
      alt="xMidYMid slice"
    /> -->
    <!-- INFO: imagen lateral izquierda  -->
    <!--    <img
      class="img-marco rotate-90"
      [style]="
        'top: -' +
        _pluralState.frameThick +
        'px; left: -' +
        _pluralState.frameThick +
        'px; z-index: 1; width:' +
        mLuisaHeight +
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
    /> -->
    <!-- INFO: imagen lateral derecha  -->
    <!--     <img
      class="img-marco"
      [style]="
        'bottom: -' +
        _pluralState.frameThick * 2 +
        'px;
               left: ' +
        (mLuisaWidth + _pluralState.totalArtMLuisaWidth) +
        'px; z-index: 1; transform: rotate(270deg);' +
        'width:' +
        mLuisaHeight +
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
    /> -->
  `,
  styles: `
    .img-marco {
  position: absolute;
  max-width: none;
}
  `,
})
export class PluralPiecesCanvasIntraframeComponent {
  @Input() mLuisaHeight!: number;
  @Input() mLuisaWidth: any;
  @Input() index: any;
  @Input() frame: any;
  @Input() frameThick: any;

  constructor() {
    let total;
    let arr = this._pluralState.artCompositionList;
    let indice = this.index;

    total = arr.slice(0, -indice);

    console.log(arr);
    console.log(total);

    //console.log(total);
  }

  _pluralState = inject(PluralPiecesStateService).store;
  _pluralAction = inject(PluralPiecesActionService);

  ngOnInit(): void {
    /*     console.log(
      this._pluralAction.sumarHastaIndice(
        this._pluralState.artCompositionList,
        this.index
      )
    ); */
  }

  /*   getStyles() {
    return `height:${
      this.mLuisaHeight * 2 +
      this._pluralState.artHeight +
      this._pluralState.intraFrameThick * 2
    }px;
    width:${
      this.mLuisaWidth * 2 +
      this._pluralState.artWidth +
      this._pluralState.intraFrameThick * 2
    }px
    `;
  } */
}
