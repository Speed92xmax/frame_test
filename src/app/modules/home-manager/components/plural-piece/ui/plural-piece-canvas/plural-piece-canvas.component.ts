import { Component, inject } from '@angular/core';
import { PluralPiecesStateService } from '../../services/plural-pieces-state.service';
import { PluralPiecesActionService } from '../../services/plural-pieces-action.service';
import { CommonModule } from '@angular/common';
import { PluralPiecesCanvasFrameComponent } from '../plural-pieces-canvas-frame/plural-pieces-canvas-frame.component';
import { PluralPiecesCanvasArtComponent } from '../plural-pieces-canvas-art/plural-pieces-canvas-art.component';
import { PluralPiecesCanvasIntraframeComponent } from '../plural-pieces-canvas-intraframe/plural-pieces-canvas-intraframe.component';

@Component({
  selector: 'plural-piece-canvas',
  standalone: true,
  imports: [
    CommonModule,
    PluralPiecesCanvasFrameComponent,
    PluralPiecesCanvasArtComponent,
    PluralPiecesCanvasIntraframeComponent,
  ],
  template: `
    <div
      class="flex items-center justify-center w-full h-full overflow-hidden "
    >
      <div
        [style]="
          'height: ' +
          (_pluralState.totalCanvasHeight - _pluralState.frameThick * 2) +
          'px; width: ' +
          (_pluralState.totalCanvasWidth - _pluralState.frameThick * 2) +
          'px; transform: scale(' +
          _pluralState.zoom +
          ') translate(' +
          (_pluralState.xAxis + _pluralState.frameThick) +
          'px,' +
          (_pluralState.yAxis + _pluralState.frameThick) +
          'px)'
        "
        class="relative visible flex items-center justify-center w-full"
      >
        <div class=" w-full h-full  relative">
          <!--INFO : Arte  -->
          <plural-pieces-canvas-art />

          <!--INFO : Maria Luisa  -->
          @for (item of _pluralState.artCompositionList; track $index) {
          @if(item.type === 'paspartu'){

          <div
            [style.background]="item.fill"
            [style.height.px]="item.height * 2 + _pluralState.artHeight"
            [style.width.px]="item.width * 2 + _pluralState.artWidth"
            [ngStyle]="{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '-'+$index,
                    position: 'absolute',
                  }"
          >
            <button
              class="btn btn-sm"
              (click)="_pluralAction.removeMLuisaItem($index)"
            >
              Eliminar
            </button>
          </div>

          } @if(item.type==='intraFrame'){
          <plural-pieces-canvas-intraframe
            [mLuisaHeight]="item.height"
            [mLuisaWidth]="item.width"
            [index]="$index"
            [frame]="item.frame"
            [frameThick]="item.frameThick"
          />
          } }
        </div>

        <plural-pieces-canvas-frame />
      </div>
    </div>
  `,
  styles: `
    .img-marco {
    position: absolute;
    max-width: none;
  }
  `,
})
export class PluralPieceCanvasComponent {
  _pluralState = inject(PluralPiecesStateService).store;
  _pluralAction = inject(PluralPiecesActionService);
}
