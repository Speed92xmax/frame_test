import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
    <div class="h-full w-full flex flex-col py-10">
      <!-- [style]="'border: black solid 1px; padding: ' + grosor + 'px'" -->
      <div
        #outerContainerWithPadding
        class="overflow-hidden max-w-screen mx-2"
        [style]="
          'border: black solid 1px; padding: ' +
          grosor * this.zoom +
          'px; max-width: 1000px; max-height: 1000px;'
        "
      >
        <div
          #outerContainer
          class="outerContainer relative"
          [style]="'width: 1000px; height: 1000px; border: black solid 1px;'"
          (click)="moveToClickPosition($event)"
          (wheel)="onWheel($event)"
          (mousedown)="onMouseDown($event)"
          (mouseup)="onMouseUp()"
        >
          <!-- INFO: (widthScale * mmToPxFactor) conversion de milimetros a pixeles -->
          <div
            #innerContainer
            [style]="
              'height: ' +
              heightScale * mmToPxFactor +
              'px; width: ' +
              widthScale * mmToPxFactor +
              'px; transform: scale(' +
              zoom +
              '); position: absolute; left: ' +
              positionX +
              'px; top: ' +
              positionY +
              'px; transform-origin: 0px 0px;'
            "
            class="relativee visible cursor-pointer"
          >
            <!-- INFO: imagen superior vertical  -->
            <img
              class="img-marco"
              [width]="widthScale * mmToPxFactor + grosor * 2"
              [height]="grosor"
              [style]="
                'left: -' +
                grosor +
                'px; top: -' +
                grosor +
                'px; z-index: 2; aspect-ratio: ' +
                (widthScale * mmToPxFactor + grosor * 2) / grosor +
                '; clip-path: polygon(0 0, 100% 0, ' +
                (widthScale * mmToPxFactor + grosor) +
                'px 100%, ' +
                grosor +
                'px 100%);'
              "
              [src]="imgSelected.img"
              alt="xMidYMid slice"
            />
            <!-- INFO: imagen inferior vertical  -->
            <img
              class="img-marco"
              [width]="widthScale * mmToPxFactor + grosor * 2"
              [height]="grosor"
              [style]="
                'left: -' +
                grosor +
                'px; bottom: -' +
                grosor +
                'px; z-index: 2; aspect-ratio: ' +
                (widthScale * mmToPxFactor + grosor * 2) / grosor +
                '; clip-path: polygon(' +
                grosor +
                'px 0, ' +
                (widthScale * mmToPxFactor + grosor) +
                'px 0, 100% 100%, 0% 100%); max-width: none;'
              "
              [src]="imgSelected.img"
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
                (heightScale * mmToPxFactor + grosor * 2) +
                'px; height:' +
                +grosor +
                'px; ' +
                'aspect-ratio: ' +
                (heightScale * mmToPxFactor) / grosor +
                '; transform-origin: ' +
                grosor / 2 +
                'px ' +
                grosor / 2 +
                'px;'
              "
              [src]="imgSelected.img"
              alt="xMidYMid slice"
            />
            <!-- INFO: imagen lateral derecha  -->
            <img
              class="img-marco"
              [style]="
                'top: ' +
                grosor +
                'px; left: ' +
                widthScale * mmToPxFactor +
                'px; z-index: 1; transform: rotate(270deg);' +
                'width:' +
                (heightScale * mmToPxFactor + grosor * 2) +
                'px; height:' +
                +grosor +
                'px; ' +
                'aspect-ratio: ' +
                (heightScale * mmToPxFactor + grosor * 2) / grosor +
                '; transform-origin: ' +
                (heightScale * mmToPxFactor) / 2 +
                'px ' +
                (heightScale * mmToPxFactor) / 2 +
                'px;'
              "
              [src]="imgSelected.img"
              alt="xMidYMid slice"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Controles para cada pieza del SVG -->
    <!-- style="position: absolute; botom: 0px; left: 0px; background: blue; z-index: 2;" -->
    <div class="flex flex-wrap justify-between w-full p-10 gap-5 border">
      <div class="flex flex-col gap-3 flex-wrap">
        <label class="flex gap-4 items-center">
          Ancho Arte:
          <input
            [(ngModel)]="widthScale"
            type="range"
            min="10"
            max="4000"
            step="1"
            (input)="adjustScale()"
          />
          <input
            [(ngModel)]="widthScale"
            class="border"
            type="number"
            min="10"
            max="4000"
            step="1"
            (input)="adjustScale()"
          />
          mm
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
        <label class="flex gap-4 items-center">
          grosor Marco:
          <input
            type="range"
            [(ngModel)]="grosor"
            min="5"
            [max]="500"
            step="1"
          />
          <input
            class="border"
            type="number"
            [(ngModel)]="grosor"
            min="5"
            [max]="500"
            step="1"
          />
          px
        </label>
      </div>
      <div class="flex flex-col gap-3 flex-wrap">
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
          Posición X:
          <input
            [min]="-widthScale"
            [max]="widthScale"
            type="range"
            [(ngModel)]="positionX"
            step="1"
          />
          <!-- min="0.01"
          max="2" -->
          <input
            [min]="-widthScale"
            [max]="widthScale"
            class="border"
            type="number"
            [(ngModel)]="positionX"
            step="1"
          />
          px
        </label>
        <label class="flex gap-4 items-center">
          Posición Y:
          <input
            type="range"
            [(ngModel)]="positionY"
            step="1"
            [min]="-heightScale"
            [max]="heightScale"
          />
          <input
            class="border"
            [min]="-heightScale"
            [max]="heightScale"
            type="number"
            [(ngModel)]="positionY"
            step="1"
          />
          px
        </label>
      </div>
    </div>

    <button (click)="adjustScale()">
      <i class="material-icons">fullscreen</i>
    </button>

    <!-- Controles para elegir imagen -->
    <div class="border flex gap-2">
      @for (frame of frameList; track $index) {
      <div
        (click)="this.imgSelected = frame"
        class="w-[100px] h-[100px] p-1 border pointer overflow-hidden"
      >
        <img
          [src]="frame.preview"
          [alt]="frame"
          class="rotate-45"
          style="max-height: 100px; max-width: 100px; width: 100%; heigth: 100%;"
        />
      </div>
      }
    </div>
  `,
})
export class PluralPieceComponent {
  frameList: { img: string; preview: string }[] = [
    {
      img: '../../../../../assets/frames/marco-1.png',
      preview: '../../../../../assets/frames/esquina-1.png',
    },
    {
      img: '../../../../../assets/frames/marco-2.png',
      preview: '../../../../../assets/frames/esquina-2.png',
    },
    {
      img: '../../../../../assets/frames/marco-3.png',
      preview: '../../../../../assets/frames/marco-3.png',
    },
  ];
  imgSelected: { img: string; preview: string } = this.frameList[0];

  @ViewChild('outerContainer', { static: true }) outerContainer!: ElementRef;
  @ViewChild('innerContainer', { static: true }) innerContainer!: ElementRef;
  @ViewChild('outerContainerWithPadding', { static: true })
  outerContainerWithPadding!: ElementRef;

  // Variables de escala de cada pieza
  widthScale: number = 200;
  heightScale: number = 200;
  grosor: number = 20;
  zoom: number = 1;
  positionX: number = 0;
  positionY: number = 0;

  private dragging: boolean = false;
  private offsetX: number = 0; // Diferencia entre el mouse y el div
  private offsetY: number = 0;
  private ulitmo: number = 0; // Diferencia entre el mouse y el div
  dpi = 96; // varia segun la pantalla
  mmToPxFactor = 3.78;

  adjustScale() {
    const parentWidth =
      this.outerContainerWithPadding.nativeElement.offsetWidth -
      this.grosor * 2;
    const parentHeight =
      this.outerContainerWithPadding.nativeElement.offsetHeight -
      this.grosor * 2;
    const childWidth = this.innerContainer.nativeElement.offsetWidth;
    const childHeight = this.innerContainer.nativeElement.offsetHeight;

    console.log({ parentHeight, parentWidth, childHeight, childWidth });
    // Calcula la escala en función del tamaño del padre y el hijo
    const widthScale = parentWidth / childWidth;
    const heightScaleTemp = parentHeight / childHeight;

    // Toma el factor de escala menor para que el hijo se ajuste completamente dentro del padre
    this.zoom = Math.min(widthScale, heightScaleTemp);
    console.log({ zoom: this.zoom, widthScale, heightScaleTemp });

    this.positionX = parentWidth / 2 - (childWidth * this.zoom) / 2;
    this.positionY = parentHeight / 2 - (childHeight * this.zoom) / 2;
    // this.adjustScale2();
    // 500 - 100
  }
  adjustScale2() {
    const parentWidth =
      this.outerContainerWithPadding.nativeElement.offsetWidth -
      this.grosor * 2;
    const parentHeight =
      this.outerContainerWithPadding.nativeElement.offsetHeight -
      this.grosor * 2;
    const childWidth = this.innerContainer.nativeElement.offsetWidth;
    const childHeight = this.innerContainer.nativeElement.offsetHeight;

    console.log({ parentHeight, parentWidth, childHeight, childWidth });
    // Calcula la escala en función del tamaño del padre y el hijo
    // const widthScale = parentWidth / childWidth;
    // const heightScaleTemp = parentHeight / childHeight;

    // Toma el factor de escala menor para que el hijo se ajuste completamente dentro del padre
    // this.zoom = Math.min(widthScale, heightScaleTemp);
    // console.log({ zoom: this.zoom, widthScale, heightScaleTemp });

    this.positionX = parentWidth / 2 - childWidth / 2;
    // 500 - 100
  }

  onWheel(event: WheelEvent): void {
    const zoomStep = 0.01; // Cambia este valor para aumentar o disminuir la velocidad del zoom
    event.preventDefault(); // Evita el desplazamiento de la página
    if (event.deltaY < 0 && this.zoom < 2) {
      // Rueda hacia arriba: hacer zoom in
      const newPosition = this.zoom + zoomStep;
      this.zoom = parseFloat(newPosition.toFixed(2));
    } else if (event.deltaY > 0 && this.zoom > 0) {
      // Rueda hacia abajo: hacer zoom out
      const newPosition = this.zoom - zoomStep;
      this.zoom = parseFloat(newPosition.toFixed(2));
    }
  }

  moveToClickPosition(event: MouseEvent): void {
    console.log({ clientX: event.clientX, clientY: event.clientY });

    const containerRect =
      this.outerContainer.nativeElement.getBoundingClientRect();
    const containerinner =
      this.innerContainer.nativeElement.getBoundingClientRect();

    const width = containerinner.width;
    const height = containerinner.height;
    // Calcula la nueva posición centrada
    const newPosX = event.clientX - containerRect.left - width / 2; // es la mitad del ancho de inner-div
    const newPosY = event.clientY - containerRect.top - height / 2; // es la mitad de la altura de inner-div
    // const newPosX = event.clientX - containerRect.left - 50; // 50 es la mitad del ancho de inner-div
    // const newPosY = event.clientY - containerRect.top - 50; // 50 es la mitad de la altura de inner-div

    // console.log({ newPosX, newPosY });
    console.log({
      width: containerinner.width,
      height: containerinner.height,
      left: containerinner.left,
      top: containerinner.top,
      containerinner,
    });
    // console.log({
    //   width: containerRect.width,
    //   height: containerRect.height,
    //   left: containerRect.left,
    //   top: containerRect.top,
    //   containerRect,
    // });

    // Asegura que el div no se salga de los límites del contenedor
    this.positionY = Math.min(
      Math.max(newPosY, 0),
      containerRect.height - height
    ); // 100 es la altura del inner-div
    this.positionX = Math.min(
      Math.max(newPosX, 0),
      containerRect.width - width
    ); // 100 es el ancho del inner-div
    // this.positionX = Math.min(Math.max(newPosX, 0), containerRect.width - 100); // 100 es el ancho del inner-div
    // this.positionY = Math.min(Math.max(newPosY, 0), containerRect.height - 100); // 100 es la altura del inner-div
  }

  onMouseDown(event: MouseEvent): void {
    this.dragging = true;

    const containerRect =
      this.outerContainer.nativeElement.getBoundingClientRect();

    this.ulitmo = this.positionX;
    // Calcula el desfase tomando en cuenta el offset del contenedor
    this.offsetX = event.clientX - containerRect.left - this.positionX;
    this.offsetY = event.clientY - containerRect.top - this.positionY;
    console.log('clcick');
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.dragging) {
      const containerRect =
        this.outerContainer.nativeElement.getBoundingClientRect();
      // console.log({ event });

      // Actualiza la posición ajustada al desfase
      this.positionX =
        event.clientX - containerRect.left - this.offsetX + this.grosor;
      // this.positionX = this.ulitmo;
      this.positionY =
        event.clientY - containerRect.top - this.offsetY + this.grosor;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    console.log('dalskjdksadjñ');
    this.dragging = false;
  }
}
