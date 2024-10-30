import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'single-piece',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="grow w-full flex justify-center">
      <svg
        [attr.viewBox]="getViewBox()"
        xmlns="http://www.w3.org/2000/svg"
        class="border-4 border-gray-500"
        width="800"
        height="400"
      >
        <!-- <path [attr.d]="pathD" fill="url(#piecePattern)" /> -->
        <rect [attr.height]="svgHeight" [attr.width]="svgWidth" fill="#000" />
        <defs>
          <pattern
            id="piecePattern"
            patternUnits="objectBoundingBox"
            width="1"
            height="1"
            patternContentUnits="objectBoundingBox"
          >
            <image
              xlink:href="../../../../../assets/frames/frame-vertical.png"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid meet"
            />
          </pattern>
        </defs>
      </svg>
    </div>

    <div class="flex flex-wrap p-10 gap-4">
      <label class="flex flex-col">
        <span>Height (cm):</span>
        <input type="number" [(ngModel)]="heightCm" (input)="updatePath()" />
      </label>

      <label class="flex flex-col">
        <span>Width (cm):</span>
        <input type="number" [(ngModel)]="widthCm" (input)="updatePath()" />
      </label>

      <label class="flex flex-col">
        <span>ViewBox minX:</span>
        <input
          type="range"
          [(ngModel)]="viewBoxMinX"
          (input)="updateViewBox()"
          min="0"
          max="3000"
        />
      </label>
      <label class="flex flex-col">
        <span>ViewBox minY:</span>
        <input
          type="range"
          [(ngModel)]="viewBoxMinY"
          (input)="updateViewBox()"
          min="0"
          max="3000"
        />
      </label>
      <label class="flex flex-col">
        <span>ViewBox Width:</span>
        <input
          type="range"
          [(ngModel)]="viewBoxWidth"
          (input)="updateViewBox()"
          min="100"
          max="3000"
        />
      </label>
      <label class="flex flex-col">
        <span>ViewBox Height:</span>
        <input
          type="range"
          [(ngModel)]="viewBoxHeight"
          (input)="updateViewBox()"
          min="100"
          max="3000"
        />
      </label>
    </div>
  `,
})
export class SinglePieceComponent {
  heightCm: number = 10; // Altura en centímetros
  widthCm: number = 10; // Ancho en centímetros
  private convertToPx: number = 37.8; // Conversión de cm a px

  svgWidth: number = this.widthCm * this.convertToPx; // Ancho calculado
  svgHeight: number = this.heightCm * this.convertToPx; // Alto calculado
  pathD: string = this.generatePathD(); // Dibujo del path inicial

  // Valores del viewBox
  viewBoxMinX: number = 0;
  viewBoxMinY: number = 0;
  viewBoxWidth: number = 800;
  viewBoxHeight: number = 400;

  // Método para actualizar el tamaño del path basado en la altura y ancho
  updatePath() {
    this.svgHeight = this.heightCm * this.convertToPx; // Altura en px
    this.svgWidth = this.widthCm * this.convertToPx; // Ancho en px
    this.pathD = this.generatePathD(); // Generar nuevo path
  }

  // Método para generar el D del path en horizontal
  generatePathD(): string {
    const heightPx = this.svgHeight;
    const widthPx = this.svgWidth;
    // Cambiar el path para dibujar horizontalmente
    return `M0 0 L${widthPx} 0 L${widthPx} ${heightPx} L0 ${heightPx} Z`;
  }

  // Método para obtener el viewBox
  getViewBox(): string {
    return `${this.viewBoxMinX} ${this.viewBoxMinY} ${this.viewBoxWidth} ${this.viewBoxHeight}`;
  }

  // Método que se ejecuta al modificar cualquiera de los valores del viewBox
  updateViewBox() {
    this.getViewBox();
  }
}
