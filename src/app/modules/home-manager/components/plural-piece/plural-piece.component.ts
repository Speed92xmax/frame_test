import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface mLuisaItem {
  color: string;
  height: number;
  width: number;
}

@Component({
  selector: 'plural-piece',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styles: `
  .img-marco {
    position: absolute;
    max-width: none;
  }

  `,
  template: `
    <div class="h-screen w-full flex justify-between p-10 ">
      <!-- Controles para cada pieza del SVG -->

      <div class="grid grid-cols-2 gap-3 place-content-start w-1/5">
        <label for="" class="flex flex-col gap-3 w-full">
          <span class="font-bold text-lg">Ancho de arte</span>
          <input
            type="number"
            class="input input-bordered w-full"
            [(ngModel)]="artWidth"
            min="0"
            step="1"
            (change)="updateValues()"
          />
        </label>

        <div class="flex flex-col gap-3 w-full">
          <label for="">
            <span class="font-bold text-lg">Alto de arte</span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            [(ngModel)]="artHeight"
            min="0"
            step="1"
            (change)="updateValues()"
          />
        </div>

        <div class="flex flex-col gap-3 w-full">
          <label for="">
            <span class="font-bold text-lg">Ancho de Marialuisa</span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            [(ngModel)]="newMLuisaItem.width"
            min="0"
            step="1"
            (change)="updateValues()"
          />
        </div>

        <div class="flex flex-col gap-3 w-full">
          <label for="">
            <span class="font-bold text-lg">Alto de Marialuisa</span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            [(ngModel)]="newMLuisaItem.height"
            min="0"
            step="1"
            (change)="updateValues()"
          />
        </div>

        <div class="flex flex-col gap-3 col-span-2 w-full">
          <label for="">
            <span class="font-bold text-lg">Color de marialuisa</span>
          </label>
          <input
            type="text"
            class="input input-bordered w-full"
            [(ngModel)]="newMLuisaItem.color"
            (change)="updateValues()"
          />
        </div>

        <button class="btn btn-sm col-span-2" (click)="addMLuisaItem()">
          Agregar Maria Luisa
        </button>
        <div class="flex flex-col gap-3 col-span-2 w-full">
          <label for="">
            <span class="font-bold text-lg">Grueso de marco</span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            [(ngModel)]="frameThick"
            min="0"
            step="1"
            (change)="updateValues()"
          />
        </div>

        <div class="flex flex-col gap-3 col-span-2 w-full">
          <label for="">
            <span class="font-bold text-lg">Zoom</span>
          </label>
          <input
            type="range"
            class=" w-full"
            [(ngModel)]="zoom"
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
            [(ngModel)]="xAxis"
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
            [(ngModel)]="yAxis"
            [min]="'-' + artHeight"
            [max]="artHeight"
            step="0.1"
          />
          <span>{{ yAxis }}</span>
        </div>

        <button class="btn btn-sm col-span-2" (click)="updateValues()">
          Actualizar
        </button>
      </div>
      <!-- ViewPort de construcción de cuadro -->
      <div
        class="flex items-center justify-center w-full h-full overflow-hidden "
      >
        <div
          [style]="
            'height: ' +
            (totalCanvasHeight - frameThick * 2) +
            'px; width: ' +
            (totalCanvasWidth - frameThick * 2) +
            'px; transform: scale(' +
            zoom +
            ') translate(' +
            (xAxis + frameThick) +
            'px,' +
            (yAxis + frameThick) +
            'px)'
          "
          class="relative visible flex items-center justify-center w-full"
        >
          <!--INFO : Maria Luisa  -->

          <div class=" flex flex-col w-full">
            <div class=" w-full h-full  relative">
              <div
                class="w-full flex justify-center items-center"
                [ngStyle]="{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  position: 'absolute'
                }"
              >
                <img
                  src="../../../../../assets/art-samples/art2.jpg"
                  alt=""
                  [ngStyle]="{
                    height: artHeight + 'px',
                    width: artWidth + 'px'
                  }"
                />
              </div>
              @for (item of mLuisaList; track $index) {

              <div
                [style.background]="item.color"
                [style.height.px]="item.height * 2 + artHeight"
                [style.width.px]="item.width * 2 + artWidth"
                [ngStyle]="{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: $index,
                position: 'absolute',
              }"
              >
                <button class="btn btn-sm" (click)="removeMLuisaItem($index)">
                  Eliminar
                </button>
              </div>
              }
            </div>
          </div>
          <!--        <div class="flex items-center justify-center ">
            <div
              class="flex justify-center items-center"
              [ngStyle]="{
                'background-color': 'red',
                height: totalArtMLuisaHeight + 'px',
                width: totalArtMLuisaWidth + 'px',
            
              }"
            >
              <div
                class=""
                [ngStyle]="{
                'background-color': 'blue',
                height: artHeight + 'px',
                width: artWidth + 'px',
          
              }"
              ></div>
            </div>
          </div> -->
          <!-- INFO: imagen superior vertical  -->
          <img
            class="img-marco"
            [width]="frameThick ? totalArtMLuisaWidth + frameThick * 2 : 0"
            [height]="frameThick"
            [style]="
              'left: -' +
              frameThick +
              'px; top: -' +
              frameThick +
              'px; z-index: 2; aspect-ratio: ' +
              (totalArtMLuisaWidth + frameThick * 2) / frameThick +
              '; clip-path: polygon(0 0, 100% 0, ' +
              (totalArtMLuisaWidth + frameThick) +
              'px 100%, ' +
              frameThick +
              'px 100%);'
            "
            src="../../../../../assets/frames/image 1.png"
            alt="xMidYMid slice"
          />
          <!-- INFO: imagen inferior vertical  -->
          <img
            class="img-marco"
            [width]="frameThick ? totalArtMLuisaWidth + frameThick * 2 : 0"
            [height]="frameThick"
            [style]="
              'left: -' +
              frameThick +
              'px; bottom: -' +
              frameThick +
              'px; z-index: 2; aspect-ratio: ' +
              (totalArtMLuisaWidth + frameThick * 2) / frameThick +
              '; clip-path: polygon(' +
              frameThick +
              'px 0, ' +
              (totalArtMLuisaWidth + frameThick) +
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
              frameThick +
              'px; left: -' +
              frameThick +
              'px; z-index: 1; width:' +
              totalCanvasHeight +
              'px; height:' +
              +frameThick +
              'px; ' +
              'aspect-ratio: ' +
              artHeight / frameThick +
              '; transform-origin: ' +
              frameThick / 2 +
              'px ' +
              frameThick / 2 +
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
              frameThick * 2 +
              'px;
               left: ' +
              totalArtMLuisaWidth +
              'px; z-index: 1; transform: rotate(270deg);' +
              'width:' +
              totalCanvasHeight +
              'px; height:' +
              +frameThick +
              'px; ' +
              'aspect-ratio: ' +
              (artHeight + frameThick * 2) / frameThick +
              '; transform-origin: ' +
              0 +
              '% ' +
              0 +
              '%;'
            "
            src="../../../../../assets/frames/image 1.png"
            alt="xMidYMid slice"
          />
        </div>
      </div>
    </div>
  `,
})
export class PluralPieceComponent implements OnInit {
  artWidth: number = 0;
  artHeight: number = 0;

  mLuisaWidth: number = 0;
  mLuisaHeight: number = 0;

  totalArtMLuisaWidth = this.artWidth + this.mLuisaWidth * 2;
  totalArtMLuisaHeight = this.artHeight + this.mLuisaHeight * 2;

  frameThick: number = 0;

  totalCanvasWidth: number = this.totalArtMLuisaWidth + this.frameThick * 2;
  totalCanvasHeight: number = this.totalArtMLuisaHeight + this.frameThick * 2;

  /* ----------------------------- */

  mLuisaList: mLuisaItem[] = [];
  newMLuisaItem: mLuisaItem = { color: '', height: 0, width: 0 };

  addMLuisaItem() {
    this.mLuisaList.push({ ...this.newMLuisaItem });
    this.sortItemsBySize();
    this.newMLuisaItem = {
      color: '',
      height: 0,
      width: 0,
    };
    this.updateMaxDimensions();
  }

  removeMLuisaItem(index: number) {
    this.mLuisaList.splice(index, 1);
    this.updateMaxDimensions();
    this.updateValues();
  }

  sortItemsBySize() {
    this.mLuisaList.sort((a, b) => b.height * b.width - a.height * a.width);
  }

  /* ----------------------------- */

  zoom: number = 1;

  xAxis: number = 0;
  yAxis: number = 0;

  updateValues() {
    this.artHeight = this.artHeight;
    this.artWidth = this.artWidth;
    this.frameThick = this.frameThick;
    this.totalArtMLuisaWidth = this.artWidth + this.mLuisaWidth * 2;
    this.totalArtMLuisaHeight = this.artHeight + this.mLuisaHeight * 2;
    this.totalCanvasHeight = this.totalArtMLuisaHeight + this.frameThick * 2;
    this.totalCanvasWidth = this.totalArtMLuisaWidth + this.frameThick * 2;
    this.updateMaxDimensions();
  }

  updateMaxDimensions() {
    if (this.mLuisaList.length > 0) {
      const maxItem = this.mLuisaList[0]; // El primer elemento ya es el más grande después de ordenar
      this.totalArtMLuisaWidth = maxItem.width * 2 + this.artWidth;
      this.totalArtMLuisaHeight = maxItem.height * 2 + this.artHeight;
    }
    // Actualizar los valores de totalCanvasWidth y totalCanvasHeight
    this.totalCanvasWidth = this.totalArtMLuisaWidth + this.frameThick * 2;
    this.totalCanvasHeight = this.totalArtMLuisaHeight + this.frameThick * 2;

    console.log(
      'ancho total :' +
        this.totalCanvasWidth +
        '   Alto total:' +
        this.totalCanvasHeight
    );
  }

  ngOnInit(): void {
    this.updateValues();
    this.updateMaxDimensions();
  }
}

/* @Component({
  selector: 'plural-piece',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styles: [
    `
      .img-marco {
        position: absolute;
        max-width: none;
      }
    `,
  ],
  template: `
    <div class="h-screen w-full flex flex-col py-10 relative">
      <div
        class=" items-center justify-center overflow-hidden top-0 left-0"
        style="width: 1000px; height: 1000px; border: black solid 2px"
      >
        <div
          [style]="
            'transition: all 0.5s;' +
            'height: ' +
            heightScale +
            'px; width: ' +
            widthScale +
            'px; transform: scale(' +
            zoom +
            ') translate(' +
            (xAxis + grosor) +
            'px,' +
            (yAxis + grosor) +
            'px)'
          "
          class="relative visible"
        >
          <div
            class="w-full h-full bg-orange-100 "
            [style]="'padding:' + mLuisa + 'px'"
          >
            <div class="w-full h-full inner-shadow">
              <img
                src="../../../../../assets/art-samples/859-650x500.jpg"
                alt=""
                class="w-full h-full "
              />
            </div>
          </div>

          <!-- INFO: imagen superior vertical  -->

          <img
            class="img-marco"
            [width]="widthScale + grosor * 2"
            [height]="grosor"
            [style]="
              'left: -' +
              grosor +
              'px; top: -' +
              grosor +
              'px; z-index: 2; aspect-ratio: ' +
              (widthScale + grosor * 2) / grosor +
              '; clip-path: polygon(0 0, 100% 0, ' +
              (widthScale + grosor) +
              'px 100%, ' +
              grosor +
              'px 100%);'
            "
            src="../../../../../assets/frames/image 1.png"
            alt="xMidYMid slice"
          />
          <!-- INFO: imagen inferior vertical  -->
          <img
            class="img-marco"
            [width]="widthScale + grosor * 2"
            [height]="grosor"
            [style]="
              'left: -' +
              grosor +
              'px; bottom: -' +
              grosor +
              'px; z-index: 2; aspect-ratio: ' +
              (widthScale + grosor * 2) / grosor +
              '; clip-path: polygon(' +
              grosor +
              'px 0, ' +
              (widthScale + grosor) +
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
              grosor +
              'px; left: -' +
              grosor +
              'px; z-index: 1; width:' +
              (heightScale + grosor * 2) +
              'px; height:' +
              +grosor +
              'px; ' +
              'aspect-ratio: ' +
              heightScale / grosor +
              '; transform-origin: ' +
              grosor / 2 +
              'px ' +
              grosor / 2 +
              'px;'
            "
            src="../../../../../assets/frames/image 1.png"
            alt="xMidYMid slice"
          />
          <!-- INFO: imagen lateral derecha  -->
          <img
            class="img-marco"
            [style]="
              'top: ' +
              grosor +
              'px; left: ' +
              widthScale +
              'px; z-index: 1; transform: rotate(270deg);' +
              'width:' +
              (heightScale + grosor * 2) +
              'px; height:' +
              +grosor +
              'px; ' +
              'aspect-ratio: ' +
              (heightScale + grosor * 2) / grosor +
              '; transform-origin: ' +
              heightScale / 2 +
              'px ' +
              heightScale / 2 +
              'px;'
            "
            src="../../../../../assets/frames/image 1.png"
            alt="xMidYMid slice"
          />
        </div>
      </div>

      <!-- Controles para cada pieza del SVG -->
      <div class="flex flex-wrap justify-between w-full p-10 gap-5">
        <div class="flex flex-col gap-3 flex-wrap">
          <label class="flex gap-4 items-center">
            Ancho Arte:
            <input
              type="range"
              [(ngModel)]="widthScale"
              min="10"
              max="4000"
              step="1"
            />
            <input
              class="border"
              type="number"
              [(ngModel)]="widthScale"
              min="10"
              max="4000"
              step="1"
            />
            px
          </label>
          <label class="flex gap-4 items-center">
            Alto Arte:
            <input
              type="range"
              [(ngModel)]="heightScale"
              min="10"
              max="4000"
              step="1"
            />
            <input
              class="border"
              type="number"
              [(ngModel)]="heightScale"
              min="10"
              max="4000"
              step="1"
            />
            px
          </label>
        </div>
        <label class="flex gap-4 items-center">
          grosor Marco:
          <input type="range" [(ngModel)]="grosor" min="5" max="100" step="1" />
          <input
            class="border"
            type="number"
            [(ngModel)]="grosor"
            min="5"
            max="100"
            step="1"
          />
          px
        </label>
        <label class="flex gap-4 items-center">
          zoom:
          <input
            type="range"
            [(ngModel)]="zoom"
            min="0.01"
            max="2"
            step="0.01"
          />
          <input
            class="border"
            type="number"
            [(ngModel)]="zoom"
            min="0.01"
            max="2"
            step="0.01"
          />
          px
        </label>
        <label class="flex gap-4 items-center">
          movimiento en y
          <input
            type="range"
            [(ngModel)]="xAxis"
            min="0"
            max="{{ widthScale }}"
            step="1"
          />
          <input
            class="border"
            type="number"
            [(ngModel)]="xAxis"
            min="0"
            max="{{ widthScale }}"
            step="1"
          />
          px
        </label>
        <label class="flex gap-4 items-center">
          movimiento en x
          <input
            type="range"
            [(ngModel)]="yAxis"
            min="0"
            max="{{ widthScale }}"
            step="1"
          />
          <input
            class="border"
            type="number"
            [(ngModel)]="yAxis"
            min="0"
            max="{{ widthScale }}"
            step="1"
          />
          px
        </label>
        <label class="flex gap-4 items-center">
          ancho maria luisa
          <input
            type="range"
            [(ngModel)]="mLuisaWidth"
            min="0"
            max="{{ widthScale }}"
            step="1"
          />
          <input
            class="border"
            type="number"
            [(ngModel)]="mLuisaWidth"
            min="0"
            max="{{ widthScale }}"
            step="1"
          />
          px
        </label>
        <label class="flex gap-4 items-center">
          ancho maria luisa
          <input
            type="range"
            [(ngModel)]="mLuisa"
            min="0"
            max="{{ artWidth }}"
            step="1"
          />
          <input
            class="border"
            type="number"
            [(ngModel)]="mLuisa"
            min="0"
            max="{{ artWidth }}"
            step="1"
          />
          px
        </label>
      </div>
    </div>
  `,
})
export class PluralPieceComponent {
  artWidth = 100;
  mLuisa = 10;

  mLuisaWidth: number = 0;
  mLuisaTotalWidth: number = this.artWidth + this.mLuisaWidth;

  // Variables de escala de cada pieza
  widthScale: number = 650;
  heightScale: number = 500;
  grosor: number = 20;
  zoom: number = 1;

  xAxis: number = 0;
  yAxis: number = 0;
} */
