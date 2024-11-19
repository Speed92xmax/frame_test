import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FramePreviewArtComponent } from './ui/frame-preview-art/frame-preview-art.component';
import { FramePreviewMluisaComponent } from './ui/frame-preview-mluisa/frame-preview-mluisa.component';
import { FramePreviewFrameComponent } from './ui/frame-preview-frame/frame-preview-frame.component';

interface FrameLayer {
  type: 'art' | 'marialuisa' | 'frame';
  width?: number;
  height?: number;
  color: string;
  frameThickness?: number;
  imageUrl?: string;
  heightThick?: any;
  widthThick?: any;
}
@Component({
  selector: 'frame-preview',
  standalone: true,
  imports: [
    CommonModule,
    FramePreviewArtComponent,
    FramePreviewMluisaComponent,
    FramePreviewFrameComponent,
  ],
  template: `<div class="frame-preview w-full h-full">
    <div class="frame-preview-container w-full h-full">
      <ng-container>
        @for (layer of layers; track $index) {
        <ng-container [ngSwitch]="layer.type">
          <frame-preview-art
            *ngSwitchCase="'art'"
            [width]="layer.width"
            [height]="layer.height"
            [imageUrl]="layer.imageUrl"
          ></frame-preview-art>

          <frame-preview-mluisa
            *ngSwitchCase="'marialuisa'"
            [totalWidth]="totalWidth"
            [totalHeight]="totalHeight"
            [heightThick]="layer.heightThick"
            [widthThick]="layer.widthThick"
            [color]="layer.color"
            [zIndex]="$index"
          ></frame-preview-mluisa>

          <frame-preview-frame
            *ngSwitchCase="'frame'"
            [width]="totalWidth"
            [height]="totalHeight"
            [frameThickness]="layer.frameThickness"
            [color]="layer.color"
          ></frame-preview-frame>
        </ng-container>
        }
      </ng-container>
    </div>
  </div> `,

  styles: [
    `
      .frame-preview {
        position: relative;
        display: inline-block;
      }
      .frame-preview-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: content-box; /* Ajusta el tamaño para que incluya bordes y marcos */
        overflow: hidden; /* Asegura que nada se salga de los límites del contenedor */
      }
    `,
  ],
})
export class FramePreviewComponent {
  artWidth = 400; // Ejemplo de anchura inicial del arte (en píxeles)
  artHeight = 300; // Ejemplo de altura inicial del arte (en píxeles)

  totalWidth: number = 0;
  totalHeight: number = 0;

  layers: FrameLayer[] = [
    {
      type: 'art',
      width: this.artWidth,
      height: this.artHeight,
      color: 'red',
      imageUrl: '../../../../../assets/art-samples/859-650x500.jpg',
    }, // Arte
    {
      type: 'marialuisa',
      heightThick: 30,
      widthThick: 60,
      color: 'green',
    }, // Primera marialuisa con textura
    {
      type: 'marialuisa',
      heightThick: 40,
      widthThick: 70,
      color: 'red',
    }, // Primera marialuisa con textura
    {
      type: 'marialuisa',
      heightThick: 100,
      widthThick: 100,
      color: 'blue',
    }, // Primera marialuisa con textura
    {
      type: 'frame',
      frameThickness: 30,
      color: 'yellow',
    }, // Primer marco
    /*    
      {
        type: 'marialuisa',
        frameThickness: 15,
        color: 'black',
      }, // Segunda marialuisa con textura
    {
      type: 'frame',
      frameThickness: 40,
      color: 'pink',
    }, // Segundo marco */
  ];

  calculateTotalDimensions() {
    // Sumar el grosor total de las capas que rodean el arte
    const totalThickness = this.layers.reduce((acc, layer) => {
      if (layer.type === 'marialuisa' || layer.type === 'frame') {
        return acc + (layer.frameThickness || 0);
      }
      return acc;
    }, 0);

    console.log(totalThickness);

    // Calcular totalWidth y totalHeight
    this.totalWidth = this.artWidth + totalThickness * 2;
    this.totalHeight = this.artHeight + totalThickness * 2;
  }

  ngOnInit() {
    this.calculateTotalDimensions();
  }
}
