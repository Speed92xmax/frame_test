import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface artItem {
  type: string;
  height?: number;
  width?: number;
  color?: string;
  artDim?: number;

  frame?: boolean;
  frameThick?: number;
}

@Component({
  selector: 'frame-cut',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-screen flex justify-center items-center w-full relative">
      @for (item of artList; track $index) {

      <!-- Para la imagen de arte -->
      @if(item.type === 'art'){
      <ng-container>
        <div
          [style.height.px]="item.artDim"
          [style.width.px]="item.artDim"
          [style.background]="'#000'"
        ></div>
      </ng-container>
      }
      <!-- Para el marco -->
      @if(item.type === 'frame'){
      <ng-container *ngIf="item.type === 'frame'">
        <div
          [style.height.px]="item.height"
          [style.width.px]="item.width"
          [style.background]="item.color"
          [ngStyle]="{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '-' + $index,
            position: 'absolute'
          }"
        >
          @if(item.frame){
          <div class="relative w-full h-full">
            <div
              class="bg-blue-300 "
              [style.width.px]="item.width"
              [style.height.px]="item.frameThick"
              [ngStyle]="{
                 top: '0',
                 left: '0',
                 position: 'absolute',
               }"
            ></div>

            <div
              class="bg-blue-300 "
              [style.width.px]="item.frameThick"
              [style.height.px]="item.height"
              [ngStyle]="{
                 top: '0',
                 left: '0',
                 position: 'absolute',
                 
               }"
            ></div>

            <div
              class="bg-blue-300 "
              [style.width.px]="item.width"
              [style.height.px]="item.frameThick"
              [ngStyle]="{
                 bottom: '0',
                 left: '0',
                 position: 'absolute',
               }"
            ></div>

            <div
              class="bg-blue-300 "
              [style.width.px]="item.frameThick"
              [style.height.px]="item.height"
              [ngStyle]="{
                 top: '0',
                 right: '0',
                 position: 'absolute',
               }"
            ></div>
          </div>
          }
        </div>
      </ng-container>
      } }
    </section>
  `,
  styles: [],
})
export class FrameCutComponent implements OnInit {
  artList: artItem[] = [];
  artDim: number = 100;
  totalCountWidth: number = this.artDim;
  totalCountHeight: number = this.artDim;

  // Función para contar los tamaños y sumar a los valores de los elementos
  startCounting(width: number, height: number, index: number) {
    this.totalCountWidth += width;
    this.totalCountHeight += height;

    // Sumar los valores acumulados a cada elemento específico
    if (this.artList[index].type === 'frame') {
      this.artList[index].width =
        (this.artList[index].width || 0) + this.totalCountWidth;
      this.artList[index].height =
        (this.artList[index].height || 0) + this.totalCountHeight;
    }

    console.log(
      `Total Width: ${this.totalCountWidth}, Total Height: ${this.totalCountHeight}`
    );
  }

  ngOnInit() {
    // Inicializamos la lista de artículos
    this.artList = [
      {
        type: 'art',
        artDim: this.artDim,
      },
      {
        type: 'frame',
        height: 30,
        width: 30,
        color: 'red',
        frame: true,
        frameThick: 10,
      },
      {
        type: 'frame',
        height: 40,
        width: 40,
        color: 'blue',
      },
      {
        type: 'frame',
        height: 50,
        width: 50,
        color: 'green',
      },
      {
        type: 'frame',
        height: 60,
        width: 60,
        color: 'yellow',
      },
    ];

    // Ejecutamos startCounting por cada "frame" al inicializar
    this.artList.forEach((item, index) => {
      if (
        item.type === 'frame' &&
        item.height !== undefined &&
        item.width !== undefined
      ) {
        // Actualizamos los valores de width y height para cada item
        this.startCounting(item.width!, item.height!, index);
      }
    });
  }
}
