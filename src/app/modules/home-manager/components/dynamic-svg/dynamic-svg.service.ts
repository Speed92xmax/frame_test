import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArtItem } from './dynamic-svg.component';

class DynamicSvgStoreModel {
  svgList: any = [];
  newObject: any = new ArtItem();
  editObjectIndex!: any;
  editObjectColor!: string;
  totalArtWorkWidth: any = 0;
  totalArtWorkHeight: any = 0;
  removeObjectIndex: any = 0;
  artPictureList: any = [
    {
      url: '../../../../../assets/art-samples/859-650x500.jpg',
      alt: 'arte 1',
    },
    {
      url: '../../../../../assets/art-samples/art2.jpg',
      alt: 'arte 2',
    },
    {
      url: '../../../../../assets/art-samples/art3.jpg',
      alt: 'arte 3',
    },
  ];
  paspartuPictureList: any = [
    {
      url: '../../../../../assets/paspartu-samples/marialuisa_1.jpg',
      alt: 'MariaLuisa 1',
    },
    {
      url: '../../../../../assets/paspartu-samples/marialuisa_2.jpg',
      alt: 'MariaLuisa 2 ',
    },
    {
      url: '../../../../../assets/paspartu-samples/marialuisa_3.jpg',
      alt: 'MariaLuisa 3',
    },
  ];
  framePictureList: any = [
    {
      topUrl: '../../../../../assets/frames/golden_frame/golden_superior.png',
      rightUrl:
        '../../../../../assets/frames/golden_frame/golden_lateral_der.png',
      bottomUrl:
        '../../../../../assets/frames/golden_frame/golden_inferior.png',
      leftUrl:
        '../../../../../assets/frames/golden_frame/golden_lateral_izq.png',
     },
     {
      topUrl: '../../../../../assets/frames/wood_frame/wood_superior.png',
      rightUrl:
        '../../../../../assets/frames/wood_frame/wood_lateral_der.png',
      bottomUrl:
        '../../../../../assets/frames/wood_frame/wood_inferior.png',
      leftUrl:
        '../../../../../assets/frames/wood_frame/wood_lateral_izq.png',
    },
  ];
  totalArtWork: any = {
    totalWidth: 0,
    totalHeight: 0,
  };
}

class TotalArtWork {
  totalWidth: number = 0;
  totalHeight: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class DynamicSvgService {
  private observableState$ = new BehaviorSubject<DynamicSvgStoreModel>(
    new DynamicSvgStoreModel()
  ).asObservable();

  store = new DynamicSvgStoreModel();

  constructor() {
    this.observableState$.subscribe((state) => (this.store = state));
  }

  private readonly KEY_PREFIX = 'PLURAL-';

  set<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(this.KEY_PREFIX + key, serializedValue);
    this.store[key as keyof DynamicSvgStoreModel] = value;
  }

  get<T>(key: string): T | null {
    const item = sessionStorage.getItem(key as string);
    if (item) {
      try {
        this.store[key as keyof DynamicSvgStoreModel] = JSON.parse(item) as T;
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
    const obj = new DynamicSvgStoreModel();
    const array = Object.keys(obj);
    for (let index = 0; index < array.length; index++) {
      this.get(`${array[index]}`);
    }
  }

  setAll() {
    const obj = new DynamicSvgStoreModel();
    const array = Object.keys(obj);
    for (let index = 0; index < array.length; index++) {
      this.set(
        `${array[index]}`,
        this.store[array[index] as keyof DynamicSvgStoreModel]
      );
    }
  }

  removeAll() {
    this.store = new DynamicSvgStoreModel();
    const obj = new DynamicSvgStoreModel();
    const array = Object.keys(obj);
    for (let index = 0; index < array.length; index++) {
      this.remove(`${array[index]}`);
    }
  }
}
