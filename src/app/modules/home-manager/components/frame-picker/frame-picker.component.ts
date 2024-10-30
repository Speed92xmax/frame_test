import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullPieceComponent } from '../full-piece/full-piece.component';

@Component({
  selector: 'frame-picker',
  standalone: true,
  imports: [FormsModule, CommonModule, FullPieceComponent],
  template: `
    <section class="w-full h-screen flex p-10 gap-10 ">
      <div class="h-full border-2 border-black w-2/4">
        <div class="flex flex-col gap-5 p-5">
          <p>Controles</p>
          <div class="flex flex-col gap-3">
            <select
              class="select select-bordered w-full"
              [(ngModel)]="frame"
              (change)="updateFrame()"
            >
              <option disabled selected>Selecciona un color</option>
              <option *ngFor="let item of imageKeys">{{ item }}</option>
            </select>
            <select
              class="select select-bordered w-full"
              [(ngModel)]="mariaLuisa"
              (change)="updateMariaLuisa()"
            >
              <option disabled selected>
                Selecciona un color de mariaLuisa
              </option>
              <option *ngFor="let item of mariaLuisaColorKeys">
                {{ item }}
              </option>
            </select>

            <select
              class="select select-bordered w-full"
              [(ngModel)]="artPic"
              (change)="updateArtPic()"
            >
              <option disabled selected>Selecciona un arte</option>
              <option *ngFor="let item of artPicKey">{{ item }}</option>
            </select>
          </div>

          <div class="flex flex-col justify-between w-full p-10 gap-10">
            <label for="" class="flex flex-col gap-3">
              <span>Min-x : {{ minX }}</span>
              <input type="range" [(ngModel)]="minX" max="700" />
            </label>
            <label for="" class="flex flex-col gap-3">
              <span>Min-x : {{ minY }}</span>
              <input type="range" [(ngModel)]="minY" max="700" />
            </label>
            <label for="" class="flex flex-col gap-3">
              <span>Min-x : {{ Vwidth }}</span>
              <input type="range" [(ngModel)]="Vwidth" max="1000" />
            </label>
            <label for="" class="flex flex-col gap-3">
              <span>Min-x : {{ Vheight }}</span>
              <input type="range" [(ngModel)]="Vheight" max="840" />
            </label>
          </div>
        </div>
      </div>
      <div class="w-full h-full border-2 border-black grow">
        <div
          class="w-full h-full border-2 border-black flex items-center justify-center"
        >
          <div class="h-screen w-full flex flex-col p-10">
            <div class="grow w-full">
              <svg
                [attr.viewBox]="getViewBox()"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
              >
                <defs>
                  <pattern
                    id="leftVertical"
                    patternUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <image
                      [attr.xlink:href]="selectedArtPic"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>
                <!-- Piezas del SVG con transformaciones dinámicas de escala -->
                <path
                  d="M0 700L-3.0598e-05 0L50 50L50 650L0 700Z"
                  [attr.fill]="selectedFrame"
                />
                <path
                  d="M0 0L700 0L650 50H50L0 0Z"
                  [attr.fill]="selectedFrame"
                />
                <path
                  d="M50 0L50 700L-2.84124e-05 650L-2.18557e-06 50L50 0Z"
                  [attr.fill]="selectedFrame"
                  transform="translate(650 0)"
                />
                <path
                  d="M700 50L0 49.9999L50 -5.68248e-05L650 -4.37114e-06L700 50Z"
                  [attr.fill]="selectedFrame"
                  transform="translate(0 650)"
                />
                <rect
                  width="600"
                  height="600"
                  transform="translate(50 50)"
                  [attr.fill]="selectedMariaLuisa"
                ></rect>

                <rect
                  width="500"
                  height="500"
                  transform="translate(100 100)"
                  fill="url(#leftVertical)"
                ></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class FramePickerComponent {
  frame: string = '';
  mariaLuisa: string = '';
  artPic: string = '';
  selectedFrame: string | null = null;
  selectedMariaLuisa: string | null = null;
  selectedArtPic: string | null = null;

  minX: number = 0;
  minY: number = 0;
  Vheight: number = 840;
  Vwidth: number = 1000;

  colors: { [key: string]: string } = {
    frame_black: '#000',
    frame_red: '#fc5203',
    frame_blue: '#0349fc',
  };

  mariaLuisaColors: { [key: string]: string } = {
    mariaLuisaC_black: '#000',
    mariaLuisaC_red: '#fc5203',
    mariaLuisaC_blue: '#0349fc',
  };

  artPicImage: { [key: string]: string } = {
    arte_1: 'assets/art-samples/859-650x500.jpg',
    arte_2: 'assets/art-samples/art2.jpg',
    arte_3: 'assets/art-samples/art3.jpg',
  };

  imageKeys = Object.keys(this.colors);
  mariaLuisaColorKeys = Object.keys(this.mariaLuisaColors);
  artPicKey = Object.keys(this.artPicImage);

  updateFrame() {
    const selectedKey = this.frame;
    this.selectedFrame = this.colors[selectedKey];
  }

  updateMariaLuisa() {
    const selectedKey = this.mariaLuisa;
    this.selectedMariaLuisa = this.mariaLuisaColors[selectedKey];
  }

  updateArtPic() {
    const selectedKey = this.artPic;
    this.selectedArtPic = this.artPicImage[selectedKey];
  }

  getViewBox(): string {
    return `${this.minX} ${this.minY} ${this.Vheight} ${this.Vwidth}`;
  }
}
