import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  FrameItem,
  IntraFrameItem,
  MLuisaItem,
  PaspartuItem,
} from '../models/mLuisaItem.model';

class PluralPiecesStoreModel {
  artWidth: any = 0;
  artHeight: any = 0;
  mLuisaWidth: any = 0;
  mLuisaHeight: any = 0;
  frameThick: any = 0;
  totalArtMLuisaWidth: any = 0;
  totalArtMLuisaHeight: any = 0;
  totalCanvasWidth: any = 0;
  totalCanvasHeight: any = 0;

  totalArtCompositionWidth: any = 0;

  isMLuisa: boolean = false;
  isIntraFrame: boolean = false;
  isFrame: boolean = false;
  isControls: boolean = false;

  artCompositionList: any[] = [];

  newPaspartuItem: PaspartuItem = new PaspartuItem();
  newFrameItem: FrameItem = new FrameItem();
  newIntraFrameItem: IntraFrameItem = new IntraFrameItem();

  mLuisaList: MLuisaItem[] = [];
  newMLuisaItem: MLuisaItem = {
    color: '',
    height: 0,
    width: 0,
    frame: false,
    frameThick: 0,
  };

  intraFrameThick: any = 0;

  zoom: any = 1;
  xAxis: any = 0;
  yAxis: any = 0;
}

@Injectable({
  providedIn: 'root',
})
export class PluralPiecesStateService {
  private observableState$ = new BehaviorSubject<PluralPiecesStoreModel>(
    new PluralPiecesStoreModel()
  ).asObservable();

  store = new PluralPiecesStoreModel();

  constructor() {
    this.observableState$.subscribe((state) => (this.store = state));
  }

  private readonly KEY_PREFIX = 'PLURAL-';

  set<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(this.KEY_PREFIX + key, serializedValue);
    this.store[key as keyof PluralPiecesStoreModel] = value;
  }

  get<T>(key: string): T | null {
    const item = sessionStorage.getItem(key as string);
    if (item) {
      try {
        this.store[key as keyof PluralPiecesStoreModel] = JSON.parse(item) as T;
        return JSON.parse(item) as T;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return null;
      }
    }
    return null;
  }

  remove<T>(key: string): T | null {
    const item = sessionStorage.removeItem((this.KEY_PREFIX + key) as string);
    return null;
  }

  getAll() {
    const obj = new PluralPiecesStoreModel();
    const array = Object.keys(obj);
    for (let index = 0; index < array.length; index++) {
      this.get(`${array[index]}`);
    }
  }

  setAll() {
    const obj = new PluralPiecesStoreModel();
    const array = Object.keys(obj);
    for (let index = 0; index < array.length; index++) {
      this.set(
        `${array[index]}`,
        this.store[array[index] as keyof PluralPiecesStoreModel]
      );
    }
  }

  removeAll() {
    this.store = new PluralPiecesStoreModel();
    const obj = new PluralPiecesStoreModel();
    const array = Object.keys(obj);
    for (let index = 0; index < array.length; index++) {
      this.remove(`${array[index]}`);
    }
  }
}
