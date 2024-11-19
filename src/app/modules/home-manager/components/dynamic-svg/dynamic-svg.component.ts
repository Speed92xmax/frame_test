import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicSvgService } from './dynamic-svg.service';

export class ArtItem {
  type!: 'art' | 'paspartu' | 'frame';
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  fill: string = '';
  insert: number = 0;
  thick: number = 0;
  zIndex?: number;
  artUrl?: string;
  paspartuUrl?: string;
  frame?: {
    verticalUrl: string;
    horizontalUrl: string;
  };
}

export class TotalArtWork {
  totalWidth: number = 0;
  totalHeight: number = 0;
}

@Component({
  selector: 'app-dynamic-svg',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section
      class="h-screen w-full flex gap-10 justify-center items-center p-5"
    >
      <div class="flex flex-col gap-10 w-1/5 h-full">
        <div class=" flex flex-col gap-10 w-full h-full">
          <div class="flex flex-col gap-3 w-full ">
          
            <div class="flex flex-col gap-3">
              <label for="">Selecciona un elemento a agregar</label>
              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.type"
              >
                <option value="art">Arte</option>
                <option value="paspartu">Maria luisa</option>
                <option value="frame">Marco</option>
              </select>
            </div>
          </div>

          <!-- Agregar arte -->
          @if(this._dynamicSvgState.store.newObject.type == 'art'){
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-3  w-full">
              <label for="">
                <span class="font-bold text-lg">Ancho</span>
              </label>
              <input
                type="number"
                class="input input-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.width"
                min="0"
                step="1"
              />
            </div>

            <div class="flex flex-col gap-3  w-full">
              <label for="">
                <span class="font-bold text-lg">Alto</span>
              </label>
              <input
                type="number"
                class="input input-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.height"
                min="0"
                step="1"
              />
            </div>

            <div class="flex flex-col gap-3  w-full col-span-2">
              <label for="">
                <span class="font-bold text-lg">Imagen </span>
              </label>

              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.artUrl"
              >
                <option disabled selected>Selecciona una imagen</option>

                @for(item of this._dynamicSvgState.store.artPictureList ; track
                $index){
                <option [value]="item.url">Arte {{ $index }}</option>
                }
              </select>
            </div>
          </div>

          <button
            class="btn col-span-2"
            (click)="
              _dynamicSvgState.store.svgList = addObject(
                this._dynamicSvgState.store.newObject
              )
            "
          >
            Crear
          </button>

          }

          <!-- Agregar marialuisa -->
          @if(this._dynamicSvgState.store.newObject.type == 'paspartu'){
          <div class="grid grid-cols-2 gap-x-5">
            <div class="flex flex-col gap-3  col-span-2">
              <label for="">
                <span class="font-bold text-lg">Grosor de marialuisa</span>
              </label>
              <input
                type="number"
                class="input input-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.thick"
                min="0"
                step="1"
              />
            </div>

            <div class="flex flex-col gap-3  w-full col-span-2">
              <label for="">
                <span class="font-bold text-lg">Maria luisas</span>
              </label>

              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.paspartuUrl"
              >
                <option disabled selected>Selecciona una Maria Luisa</option>

                @for(item of this._dynamicSvgState.store.paspartuPictureList ;
                track $index){
                <option [value]="item.url">Maria Luisa {{ $index }}</option>
                }
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-2  w-full">
            <div class="flex justify-between">
              <label for="">Agregar posicion</label>
              <input
                type="checkbox"
                class="toggle"
                [(ngModel)]="this.isMovePosition"
                [checked]="this.isMovePosition"
              />
            </div>

            @if(this.isMovePosition &&
            this._dynamicSvgState.store.svgList.length > 0){

            <div class="flex flex-col gap-3 col-span-2">
              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.insert"
              >
                <option disabled selected>Elementos</option>
                @for(item of this._dynamicSvgState.store.svgList;track $index){
                @if(item.type == 'art'){
                <option [value]="$index">Despues de Arte</option>

                } @if(item.type == 'paspartu'){
                <option [value]="$index">
                  Despues de Marialuisa {{ $index }}
                </option>

                } @if(item.type == 'frame'){
                <option [value]="$index">Despues de Marco {{ $index }}</option>

                } }
              </select>

              <button
                class="btn"
                (click)="
                  this._dynamicSvgState.store.svgList = addObjectPosition(
                    this._dynamicSvgState.store.svgList,
                    this._dynamicSvgState.store.newObject.insert,
                    this._dynamicSvgState.store.newObject
                  )
                "
              >
                Crear
              </button>
            </div>
            }
          </div>

          @if(!this.isMovePosition){

          <button
            class="btn col-span-2"
            (click)="
              _dynamicSvgState.store.svgList = addObject(
                this._dynamicSvgState.store.newObject
              )
            "
          >
            Crear
          </button>
          } }

          <!-- Agregar marco -->
          @if(this._dynamicSvgState.store.newObject.type == 'frame'){
          <div class="grid grid-cols-2 gap-x-5">
            <div class="flex flex-col gap-3  col-span-2">
              <label for="">
                <span class="font-bold text-lg">Grosor de marco</span>
              </label>
              <input
                type="number"
                class="input input-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.thick"
                min="0"
                step="1"
              />
            </div>

            <div class="flex flex-col gap-3  w-full col-span-2">
              <label for="">
                <span class="font-bold text-lg">Selecciona un marco</span>
              </label>

              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.frame"
              >
                <option disabled selected>Selecciona un marco</option>
                @for (item of _dynamicSvgState.store.framePictureList; track
                $index) {
                <option [ngValue]="item">Marco {{ $index + 1 }}</option>
                }
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-2  w-full">
            <div class="flex justify-between">
              <label for="">Agregar posicion</label>
              <input
                type="checkbox"
                class="toggle"
                [(ngModel)]="this.isMovePosition"
                [checked]="this.isMovePosition"
              />
            </div>

            @if(this.isMovePosition &&
            this._dynamicSvgState.store.svgList.length > 0){

            <div class="flex flex-col gap-3 col-span-2">
              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.newObject.insert"
              >
                <option disabled selected>Elementos</option>
                @for(item of this._dynamicSvgState.store.svgList;track $index){
                @if(item.type == 'art'){
                <option [value]="$index">Despues de Arte</option>

                } @if(item.type == 'paspartu'){
                <option [value]="$index">
                  Despues de Marialuisa {{ $index }}
                </option>

                } @if(item.type == 'frame'){
                <option [value]="$index">Despues de Marco {{ $index }}</option>

                } }
              </select>

              <button
                class="btn"
                (click)="
                  this._dynamicSvgState.store.svgList = addObjectPosition(
                    this._dynamicSvgState.store.svgList,
                    this._dynamicSvgState.store.newObject.insert,
                    this._dynamicSvgState.store.newObject
                  )
                "
              >
                Crear
              </button>
            </div>
            }
          </div>

          @if(!this.isMovePosition){
          <button
            class="btn col-span-2"
            (click)="
              this._dynamicSvgState.store.svgList = addObject(
                this._dynamicSvgState.store.newObject
              )
            "
          >
            Crear
          </button>
          } }

          <!-- Editar -->
          <div class="flex flex-col gap-2  w-full col-span-2">
            <div class="flex justify-between">
              <label for="">Editar elemento</label>
              <input
                type="checkbox"
                class="toggle"
                [(ngModel)]="this.isEditObject"
                [checked]="this.isEditObject"
              />
            </div>
            @if(this.isEditObject){

            <div class="flex flex-col gap-3">
              <select
                class="select select-bordered w-full"
                [(ngModel)]="this._dynamicSvgState.store.editObjectIndex"
              >
                <option disabled selected>Elementos</option>

                @for(item of this._dynamicSvgState.store.svgList; track $index){

                <option>{{ $index }}</option>

                }
              </select>
              @if(this._dynamicSvgState.store.editObjectIndex){

              <div class="flex flex-col gap-3  w-full">
                <label for="">
                  <span class="font-bold text-lg">Selecciona nuevo color </span>
                </label>

                <div class="flex "></div>
                <select
                  class="select select-bordered w-full"
                  [(ngModel)]="this._dynamicSvgState.store.editObjectColor"
                >
                  <option disabled selected>Color</option>
                  <option>green</option>
                  <option>blue</option>
                  <option>red</option>
                  <option>purple</option>
                  <option>yellow</option>
                  <option>pink</option>
                </select>

                <button
                  class="btn"
                  (click)="
                    this._dynamicSvgState.store.svgList =
                      this.changeObjectColor(
                        this._dynamicSvgState.store.svgList,
                        this._dynamicSvgState.store.editObjectIndex,
                        this._dynamicSvgState.store.editObjectColor
                      )
                  "
                >
                  Cambiar
                </button>
              </div>
              }
            </div>

            <div class="flex flex-col gap-3 col-span-2">
              <div class="flex flex-col ">
                <label for="">Selecciona un elemento a eliminar</label>
                <select
                  class="select select-bordered w-full"
                  [(ngModel)]="this._dynamicSvgState.store.removeObjectIndex"
                >
                  <option disabled selected>Elementos</option>

                  @for (item of this._dynamicSvgState.store.svgList;track
                  $index){
                  <option [value]="$index">Elemento {{ $index }}</option>
                  }
                </select>
              </div>
              <button
                class="btn"
                (click)="
                  this._dynamicSvgState.store.svgList = removeSpecificObject(
                    _dynamicSvgState.store.svgList,
                    this._dynamicSvgState.store.removeObjectIndex
                  )
                "
              >
                Eliminar
              </button>

              <button
                class="btn col-span-2"
                (click)="
                  this._dynamicSvgState.store.svgList = deleteAllObjectList()
                "
              >
                Eliminar todo
              </button>
            </div>
            }
          </div>
        </div>
      </div>

      <div class="relative h-full w-4/5 ">
        @for (item of _dynamicSvgState.store.svgList; track $index) {
        <!-- Arte -->
        @if(item.type=='art'){
        <div [ngStyle]="getObjectStyles(item)">
          <img
            class="w-full h-full object-cover "
            [src]="item.artUrl ? item.artUrl : ''"
          />
        </div>
        }

        <!-- Maria Luisa -->
        @if(item.type=='paspartu'){
        <div [ngStyle]="getObjectStyles(item)">
          <img
            class="h-full w-full object-cover "
            [src]="item.paspartuUrl ? item.paspartuUrl : ''"
          />
        </div>
        }

        <!-- Marco -->
        @if(item.type=='frame'){
        <div [ngStyle]="getObjectStyles(item)" class="relative">
          <!-- INFO: imagen superior   -->
          <img
            class="img-marco"
            [ngStyle]="getTopFrameStyle(item)"
            [src]="item.frame.topUrl ?? 'sin imagen'"
            alt="Sin imagen"
          />
          <!-- INFO: imagen lateral izquierda  -->
          <img
            class="img-marco"
            [ngStyle]="getLeftFrameStyle(item)"
            [src]="item.frame.leftUrl ?? 'sin imagen'"
            alt="Sin imagen"
          />

          <!-- INFO: imagen lateral derecha  -->
          <img
            class="img-marco"
            [ngStyle]="getRightFrameStyle(item)"
            [src]="item.frame.rightUrl ?? 'sin imagen'"
            alt="Sin imagen"
          />

          <!-- INFO: imagen inferior   -->
          <img
            class="img-marco"
            [ngStyle]="getBottomFrameStyle(item)"
            [src]="item.frame.bottomUrl ?? 'sin imagen'"
            alt="Sin imagen"
          />
        </div>

        } }
      </div>
    </section>
  `,
  styles: `
    .img-marco {
    position: absolute;
    max-width: none;
  }
  `,
})
export class DynamicSvgComponent {
  _dynamicSvgState = inject(DynamicSvgService);

  isMovePosition: boolean = false;
  isEditObject: boolean = false;
  canvasWidth = 500;
  canvasHeight = 500;

  sortByHeightObjectArr(artArr: ArtItem[]): ArtItem[] {
    let newArr: ArtItem[] = [...artArr];
    newArr = newArr.sort((a, b) => b.height - a.height);
    return newArr;
  }

  sortByWidthObjectArr(artArr: ArtItem[]): ArtItem[] {
    let newArr: ArtItem[] = [...artArr];
    newArr = newArr.sort((a, b) => b.width - a.width);
    return newArr;
  }

  sortBySizeObjectArr(artArr: ArtItem[]): ArtItem[] {
    let newArr: ArtItem[] = [...artArr];
    newArr = newArr.sort((a, b) => {
      let areaA = a.width * a.height;
      let areaB = b.width * b.height;
      return areaB - areaA;
    });

    return newArr;
  }

  addTotalSize(artArr: ArtItem[]) {
    let totalWidth = 0;
    let totalHeight = 0;
    let totalThick = 0;

    for (let i = 0; artArr.length > i; i++) {
      if (i == 0) {
        totalWidth = artArr[i].width;
        totalHeight = artArr[i].height;
      } else {
        totalThick += artArr[i].thick * 2;
      }
    }
    this._dynamicSvgState.store.totalArtWorkWidth = totalWidth + totalThick;
    this._dynamicSvgState.store.totalArtWorkHeight = totalHeight + totalThick;
  }

  calcItemWidthHeight(artItem: ArtItem): ArtItem {
    let newArtItem = { ...artItem };
    let totalWidth = this._dynamicSvgState.store.totalArtWorkWidth;
    let totalHeight = this._dynamicSvgState.store.totalArtWorkHeight;

    newArtItem.width = newArtItem.thick * 2 + totalWidth;
    newArtItem.height = newArtItem.thick * 2 + totalHeight;

    return newArtItem;
  }

  updateSizes(artArr: ArtItem[]): ArtItem[] {
    if (artArr.length === 0) return [];

    let newArr = [...artArr];
    // Tomamos las medidas base del arte (primer elemento)
    let baseWidth = newArr[0].width;
    let baseHeight = newArr[0].height;
    let accumulatedThick = 0;

    // Recalculamos las dimensiones para cada elemento después del arte
    for (let i = 1; i < newArr.length; i++) {
      accumulatedThick += newArr[i].thick;
      // Cada elemento crece según la base más el acumulado de thicks * 2
      newArr[i].width = baseWidth + accumulatedThick * 2;
      newArr[i].height = baseHeight + accumulatedThick * 2;
    }

    // El total es la medida base más el acumulado de thicks
    this._dynamicSvgState.store.totalArtWorkWidth =
      baseWidth + accumulatedThick * 2;
    this._dynamicSvgState.store.totalArtWorkHeight =
      baseHeight + accumulatedThick * 2;

    return newArr;
  }

  addObject(artItem: ArtItem): ArtItem[] {
    let newArray: ArtItem[] = [...this._dynamicSvgState.store.svgList];

    if (newArray.length === 0) {
      // Si es el primer elemento (arte), mantenemos sus dimensiones originales
      artItem.zIndex = 0;
      newArray.push({ ...artItem });
    } else {
      // Calculamos el acumulado de thicks hasta el momento
      let accumulatedThick = 0;
      for (let i = 1; i < newArray.length; i++) {
        accumulatedThick += newArray[i].thick;
      }

      // Añadimos el thick del nuevo elemento
      accumulatedThick += artItem.thick;

      // Las nuevas dimensiones son: base + (acumulado de thicks * 2)
      const baseWidth = newArray[0].width;
      const baseHeight = newArray[0].height;
      artItem.width = baseWidth + accumulatedThick * 2;
      artItem.height = baseHeight + accumulatedThick * 2;

      // Asignamos el zIndex negativo basado en la posición
      artItem.zIndex = -newArray.length;
      newArray.push({ ...artItem });
    }

    this._dynamicSvgState.store.newObject = new ArtItem();
    return newArray;
  }

  addObjectPosition(artArr: ArtItem[], index: number, item: ArtItem) {
    let newArr: ArtItem[] = [...artArr];
    let artItem: ArtItem = { ...item };

    // Validar que no se pueda insertar antes del art (índice 0)
    if (index <= 0) {
      index = 1;
    }

    // Si el índice es mayor que el largo del array, añadir al final
    if (index >= newArr.length) {
      index = newArr.length;
    }

    // Insertar el elemento en la posición especificada
    newArr.splice(index, 0, artItem);

    // Recalcular dimensiones para todos los elementos después del art
    if (newArr.length > 1) {
      const baseWidth = newArr[0].width;
      const baseHeight = newArr[0].height;

      for (let i = 1; i < newArr.length; i++) {
        // Calcular el acumulado de thicks hasta la posición actual
        let accumulatedThick = 0;
        for (let j = 1; j <= i; j++) {
          accumulatedThick += newArr[j].thick;
        }

        // Actualizar dimensiones del elemento actual
        newArr[i].width = baseWidth + accumulatedThick * 2;
        newArr[i].height = baseHeight + accumulatedThick * 2;

        // Actualizar zIndex
        newArr[i].zIndex = -i;
      }
    }

    this._dynamicSvgState.store.newObject = new ArtItem();
    this.isMovePosition = false;

    return newArr;
  }

  removeObject(artArray: ArtItem[] = []): ArtItem[] {
    let newArr: ArtItem[] = [...artArray];
    newArr.shift();
    this.addTotalSize(newArr);
    return newArr;
  }

  removeSpecificObject(artArray: ArtItem[], index: number): ArtItem[] {
    let newArr: ArtItem[] = [...artArray];
    newArr.splice(index, 1);
    this._dynamicSvgState.store.removeObjectIndex = 0;
    return newArr;
  }

  deleteAllObjectList() {
    let newArray: ArtItem[] = [];
    this._dynamicSvgState.store.totalArtWorkHeight = 0;
    this._dynamicSvgState.store.totalArtWorkWidth = 0;
    return newArray;
  }

  changeObjectColor(
    artArray: ArtItem[] = [],
    index: number,
    fill: string
  ): ArtItem[] {
    let newArr: ArtItem[] = [...artArray];

    newArr[index] = { ...newArr[index], fill: fill };
    this._dynamicSvgState.store.editObjectColor = '';
    console.log(newArr);

    return newArr;
  }

  getCenteredX(item: ArtItem): number {
    return (this.canvasWidth - item.width) / 2 + item.x;
  }

  getCenteredY(item: ArtItem): number {
    return (this.canvasHeight - item.height) / 2 + item.y;
  }

  getObjectStyles(item: ArtItem) {
    return {
      width: `${item.width}px`,
      height: `${item.height}px`,
      top: item.y == 0 ? `50%` : item.y,
      left: item.x == 0 ? `50%` : item.x,
      background: item.fill,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      zIndex: item.zIndex,
      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.7)',
    };
  }

  getTopFrameStyle(item: ArtItem) {
    return {
      width: item.width + 'px',
      height: item.thick + 'px',
      top: '0px',
      left: '0px',
      zIndex: '2',
      aspectRatio: `${item.width / item.thick}`,
      clipPath: `polygon(0 0, ${item.width}px 0, ${item.width - item.thick}px ${
        item.thick
      }px, ${item.thick}px ${item.thick}px)`,
      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)',

    };
  }

  getLeftFrameStyle(item: ArtItem) {
    return {
      width: item.thick + 'px',
      height: item.height + 'px',
      top: '0px',
      left: '0px',
      zIndex: '1',
      aspectRatio: `${item.height / item.thick}`,
      clipPath: `polygon(0 0, ${item.thick}px ${item.thick}px, ${
        item.thick
      }px ${item.height - item.thick}px, 0 ${item.height}px)`,
      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)',

    };
  }

  getRightFrameStyle(item: ArtItem) {
    return {
      width: item.thick + 'px',
      height: item.height + 'px',
      top: '0px',
      right: '0px',
      zIndex: '1',
      aspectRatio: `${item.height / item.thick}`,
      clipPath: `polygon(0 0, ${item.thick}px 0, ${item.thick}px ${
        item.height
      }px, 0 ${item.height - item.thick}px)`,
      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)',

    };
  }

  getBottomFrameStyle(item: ArtItem) {
    return {
      width: item.width + 'px',
      height: item.thick + 'px',
      top: item.height - item.thick + 'px',
      left: '0px',
      zIndex: '2',
      aspectRatio: `${item.width / item.thick}`,
      clipPath: `polygon(${item.thick}px 0px, ${item.width - item.thick}px 0px, ${item.width}px ${item.thick}px, 0 ${item.thick}px)`,
      boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)',

    };
  }


}
