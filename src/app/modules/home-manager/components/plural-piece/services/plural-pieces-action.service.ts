import { inject, Injectable } from '@angular/core';
import { PluralPiecesStateService } from './plural-pieces-state.service';
import {
  FrameItem,
  IntraFrameItem,
  PaspartuItem,
} from '../models/mLuisaItem.model';

@Injectable({
  providedIn: 'root',
})
export class PluralPiecesActionService {
  _pluralState = inject(PluralPiecesStateService).store;

  addMLuisaItem() {
    this._pluralState.mLuisaList.push({ ...this._pluralState.newMLuisaItem });
    this.sortItemsBySize();
    this._pluralState.newMLuisaItem = {
      color: '',
      height: 0,
      width: 0,
      frame: false,
      frameThick: 0,
    };
    this.updateMaxDimensions();
  }

  addPaspartuItem() {
    this._pluralState.artCompositionList.push({
      ...this._pluralState.newPaspartuItem,
    });
    this.getTotalArtCompositionWidth(this._pluralState.artCompositionList);
    this._pluralState.newPaspartuItem = new PaspartuItem();
  }

  addIntraFrameItem() {
    this._pluralState.artCompositionList.push({
      ...this._pluralState.newIntraFrameItem,
    });
    this.getTotalArtCompositionWidth(this._pluralState.artCompositionList);
    this._pluralState.newPaspartuItem = new IntraFrameItem();
  }

  sortItemsBySize() {
    this._pluralState.mLuisaList.sort(
      (a, b) => b.height * b.width - a.height * a.width
    );
  }

  updateMaxDimensions() {
    if (this._pluralState.mLuisaList.length > 0) {
      const maxItem = this._pluralState.mLuisaList[0]; // El primer elemento ya es el más grande después de ordenar
      this._pluralState.totalArtMLuisaWidth =
        maxItem.width * 2 + this._pluralState.artWidth;
      this._pluralState.totalArtMLuisaHeight =
        maxItem.height * 2 + this._pluralState.artHeight;
    }
    // Actualizar los valores de totalCanvasWidth y totalCanvasHeight
    this._pluralState.totalCanvasWidth =
      this._pluralState.totalArtMLuisaWidth + this._pluralState.frameThick * 2;
    this._pluralState.totalCanvasHeight =
      this._pluralState.totalArtMLuisaHeight + this._pluralState.frameThick * 2;
  }

  updateValues() {
    this._pluralState.artHeight = this._pluralState.artHeight;
    this._pluralState.artWidth = this._pluralState.artWidth;
    this._pluralState.frameThick = this._pluralState.frameThick;
    this._pluralState.totalArtMLuisaWidth =
      this._pluralState.artWidth + this._pluralState.mLuisaWidth * 2;
    this._pluralState.totalArtMLuisaHeight =
      this._pluralState.artHeight + this._pluralState.mLuisaHeight * 2;
    this._pluralState.totalCanvasHeight =
      this._pluralState.totalArtMLuisaHeight + this._pluralState.frameThick * 2;
    this._pluralState.totalCanvasWidth =
      this._pluralState.totalArtMLuisaWidth + this._pluralState.frameThick * 2;

    this._pluralState.totalArtCompositionWidth;

    this.updateMaxDimensions();
  }

  getTotalArtCompositionWidth(list: any) {
    let totalWidth = this._pluralState.artWidth;

    list.forEach((item: any) => {
      if (item.type === 'paspartu') {
        totalWidth += item.width * 2;
      } else {
        totalWidth += item.thick * 2;
      }
    });

    this._pluralState.totalArtCompositionWidth = totalWidth;
  }

  removeMLuisaItem(index: number) {
    this._pluralState.artCompositionList.splice(index, 1);
    this.getTotalArtCompositionWidth(this._pluralState.artCompositionList);
    this.updateMaxDimensions();
    this.updateValues();
  }

  sumarHastaIndice(array: any[], indice: number) {
    return array
      .slice(0, indice + 1)
      .reduce((acc, objeto) => acc + objeto.width, 0);
  }
}
