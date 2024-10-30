import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'plural-piece',
  standalone: true,
  imports: [FormsModule],
  styles: `
  .img-marco {
    position: absolute;
    max-width: none;
  }
  `,
  template: `
    <div class="h-screen w-full flex flex-col py-10">
      <div
        class=" items-center justify-center overflow-hidden"
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
            ') translate(100%, 100%);'
          "
          class="relative visible"
        >
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
      </div>
    </div>
  `,
})
export class PluralPieceComponent {
  // Variables de escala de cada pieza
  widthScale: number = 200;
  heightScale: number = 200;
  grosor: number = 20;
  zoom: number = 1;
}
