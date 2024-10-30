import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';

@Component({
  selector: 'home-frame-top',
  standalone: true,
  imports: [],
  template: ` <div id="svgContainer"></div> `,
  styles: ``,
})
export class HomeFrameTopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createFrame();
  }

  createFrame(): void {
    const draw = SVG().addTo('#svgContainer').size(500, 500);

    const frameWidth = 400;
    const frameHeight = 400;
    const cutLength = 30; // Longitud del corte en 45 grados en las esquinas

    // Crear un grupo de líneas para las esquinas y lados rectos
    const frameGroup = draw.group();

    // Coordenadas de los vértices del marco
    const points = [
      [cutLength, 0], // Esquina superior izquierda (inicio)
      [frameWidth - cutLength, 0], // Esquina superior derecha (fin del lado superior)
      [frameWidth, cutLength], // Corte en 45 grados superior derecho
      [frameWidth, frameHeight - cutLength], // Esquina inferior derecha (inicio del lado derecho)
      [frameWidth - cutLength, frameHeight], // Corte en 45 grados inferior derecho
      [cutLength, frameHeight], // Esquina inferior izquierda (inicio del lado inferior)
      [0, frameHeight - cutLength], // Corte en 45 grados inferior izquierdo
      [0, cutLength], // Corte en 45 grados superior izquierdo
      [cutLength, 0], // Regresar al inicio (esquina superior izquierda)
    ];

    // Dibujar las líneas del marco
    const path =
      `M ${points[0][0]} ${points[0][1]}` +
      ` L ${points[1][0]} ${points[1][1]}` + // Lado superior
      ` L ${points[2][0]} ${points[2][1]}` + // Corte esquina superior derecha
      ` L ${points[3][0]} ${points[3][1]}` + // Lado derecho
      ` L ${points[4][0]} ${points[4][1]}` + // Corte esquina inferior derecha
      ` L ${points[5][0]} ${points[5][1]}` + // Lado inferior
      ` L ${points[6][0]} ${points[6][1]}` + // Corte esquina inferior izquierda
      ` L ${points[7][0]} ${points[7][1]}` + // Lado izquierdo
      ` Z`; // Cerrar el camino

    // Dibujar el marco con las líneas
    frameGroup.path(path).stroke({ width: 2, color: '#000' }).fill('none');
  }
}
