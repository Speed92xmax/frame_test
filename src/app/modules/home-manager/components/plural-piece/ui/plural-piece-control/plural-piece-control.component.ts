import { Component, inject } from '@angular/core';
import { PluralPiecesStateService } from '../../services/plural-pieces-state.service';
import { PluralPiecesActionService } from '../../services/plural-pieces-action.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'plural-piece-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="grid grid-cols-2 gap-3 place-content-start w-full">
      <div class="flex flex-col gap-3 w-full">
        <label for="">
          <span class="font-bold text-lg">Ancho de arte</span>
        </label>
        <input
          type="number"
          class="input input-bordered w-full"
          [(ngModel)]="this._pluralState.artWidth"
          min="0"
          step="1"
          (change)="this._pluralAction.updateValues()"
        />
      </div>

      <div class="flex flex-col gap-3 w-full">
        <label for="">
          <span class="font-bold text-lg">Alto de arte</span>
        </label>
        <input
          type="number"
          class="input input-bordered w-full"
          [(ngModel)]="this._pluralState.artHeight"
          min="0"
          step="1"
          (change)="this._pluralAction.updateValues()"
        />
      </div>

      <!-- SELECTOR DE MARIA LUISA -->
      <div class="flex col-span-2 justify-between">
        <span class="font-bold text-lg">Agregar Maria luisa</span>
        <input
          type="checkbox"
          class="toggle"
          [(ngModel)]="this._pluralState.isMLuisa"
          [checked]="this._pluralState.isMLuisa"
        />
      </div>

      @if(_pluralState.isMLuisa){
      <div class="flex flex-col gap-3 w-full">
        <label for="">
          <span class="font-bold text-lg">Ancho de Marialuisa</span>
        </label>
        <input
          type="number"
          class="input input-bordered w-full"
          [(ngModel)]="this._pluralState.newPaspartuItem.width"
          min="0"
          step="1"
        />
      </div>

      <div class="flex flex-col gap-3 w-full">
        <label for="">
          <span class="font-bold text-lg">Alto de Marialuisa</span>
        </label>
        <input
          type="number"
          class="input input-bordered w-full"
          [(ngModel)]="this._pluralState.newPaspartuItem.height"
          min="0"
          step="1"
        />
      </div>

      <div class="flex flex-col gap-3 col-span-2 w-full">
        <label for="">
          <span class="font-bold text-lg">Color de marialuisa</span>
        </label>

        <select
          class="select select-bordered w-full"
          [(ngModel)]="this._pluralState.newPaspartuItem.fill"
        >
          <option disabled selected>Color</option>
          <option>green</option>
          <option>blue</option>
          <option>red</option>
        </select>
      </div>

      <button
        class="btn btn-sm col-span-2"
        (click)="this._pluralAction.addPaspartuItem()"
      >
        Agregar Maria Luisa
      </button>

      }

      <!-- SELECTOR DE MARCO INTERNO-->

      <div class="flex col-span-2 justify-between">
        <span class="font-bold text-lg">Marco interno</span>
        <input
          type="checkbox"
          class="toggle"
          [(ngModel)]="this._pluralState.isIntraFrame"
          [checked]="this._pluralState.isIntraFrame"
        />
      </div>

      @if(_pluralState.isIntraFrame){

      <div class="flex flex-col gap-3 col-span-2">
        <div class="flex flex-col gap-3 col-span-2 w-full">
          <label for="">
            <span class="font-bold text-lg">Grueso de marco interno</span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            [(ngModel)]="this._pluralState.newMLuisaItem.frameThick"
            min="0"
            step="1"
            (change)="this._pluralAction.updateValues()"
          />
        </div>
      </div>

      <button
        class="btn btn-sm col-span-2"
        (click)="this._pluralAction.addIntraFrameItem()"
      >
        Agregar Marco Interno
      </button>
      }

      <!-- SELECTOR DE MARCO EXTERNO -->

      <div class="flex col-span-2 justify-between">
        <span class="font-bold text-lg">Marco externo</span>
        <input
          type="checkbox"
          class="toggle"
          [(ngModel)]="this._pluralState.isFrame"
          [checked]="this._pluralState.isFrame"
        />
      </div>

      @if(_pluralState.isFrame){

      <div class="flex flex-col gap-3 col-span-2 w-full">
        <label for="">
          <span class="font-bold text-lg">Grueso de marco</span>
        </label>
        <input
          type="number"
          class="input input-bordered w-full"
          [(ngModel)]="this._pluralState.frameThick"
          min="0"
          step="1"
          (change)="this._pluralAction.updateValues()"
        />
      </div>
      }

      <div class="flex col-span-2 justify-between">
        <span class="font-bold text-lg">Controles</span>
        <input
          type="checkbox"
          class="toggle"
          [(ngModel)]="this._pluralState.isControls"
          [checked]="this._pluralState.isControls"
        />
      </div>

      <!-- CONTROLES -->
      @if(_pluralState.isControls){

      <div class="flex flex-col gap-3 col-span-2 w-full">
        <label for="">
          <span class="font-bold text-lg">Zoom</span>
        </label>
        <input
          type="range"
          class=" w-full"
          [(ngModel)]="this._pluralState.zoom"
          min="0.01"
          max="3"
          step="0.01"
        />
      </div>
      <div class="flex flex-col gap-3 col-span-2 w-full">
        <label for="">
          <span class="font-bold text-lg">Movimiento en X</span>
        </label>
        <input
          type="range"
          class=" w-full"
          [(ngModel)]="this._pluralState.xAxis"
          min="-2000"
          max="2000"
          step="0.7"
        />
      </div>

      <div class="flex flex-col gap-3 col-span-2 w-full">
        <label for="">
          <span class="font-bold text-lg">Movimiento en Y</span>
        </label>
        <input
          type="range"
          class=" w-full"
          [(ngModel)]="this._pluralState.yAxis"
          [min]="'-' + this._pluralState.artHeight"
          [max]="this._pluralState.artHeight"
          step="0.1"
        />
        <span>{{ this._pluralState.yAxis }}</span>
      </div>

      <button
        class="btn btn-sm col-span-2"
        (click)="this._pluralAction.updateValues()"
      >
        Actualizar
      </button>
      }
    </div>
  `,
  styles: ``,
})
export class PluralPieceControlComponent {
  _pluralState = inject(PluralPiecesStateService).store;
  _pluralAction = inject(PluralPiecesActionService);
}
