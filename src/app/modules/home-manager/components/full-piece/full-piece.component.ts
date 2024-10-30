import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'full-piece',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="h-screen w-full flex flex-col p-10">
      <div class="grow w-full">
        <svg
          viewBox="0 0 700 700"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="700"
        >
          <defs>
            <pattern
              id="leftVertical"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                xlink:href="../../../../../assets/frames/frame-vertical.png"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
            <pattern
              id="rightVertical"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                xlink:href="../../../../../assets/frames/frame-vertical.png"
                preserveAspectRatio="xMidYMid slice"
                transform="rotate(180 25 350)"
                x="0"
              />
            </pattern>
            <pattern
              id="topHorizontal"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                xlink:href="../../../../../assets/frames/image 1.png"
                width="700"
                y="-5"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
            <pattern
              id="bottomHorizontal"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                xlink:href="../../../../../assets/frames/image 1.png"
                width="700"
                y="-10"
                preserveAspectRatio="xMidYMid slice"
                transform="rotate(180 350 25)"
              />
            </pattern>
          </defs>

          <!-- Piezas del SVG con transformaciones dinámicas de escala -->
          <path
            d="M0 700L-3.0598e-05 0L50 50L50 650L0 700Z"
            fill="url(#leftVertical)"
          />
          <path d="M0 0L700 0L650 50H50L0 0Z" fill="url(#topHorizontal)" />
          <path
            d="M50 0L50 700L-2.84124e-05 650L-2.18557e-06 50L50 0Z"
            fill="url(#rightVertical)"
            transform="translate(650 0)"
          />
          <path
            d="M700 50L0 49.9999L50 -5.68248e-05L650 -4.37114e-06L700 50Z"
            fill="url(#bottomHorizontal)"
            transform="translate(0 650)"
          />
        </svg>
      </div>

      <!-- Controles para cada pieza del SVG -->
      <div class="flex flex-wrap justify-between w-full p-10 gap-5">
        <div class="flex flex-col gap-3">
          <h3>Left Vertical</h3>
          <label>
            Width Scale: {{ leftVerticalWidthScale }}
            <input
              type="range"
              [(ngModel)]="leftVerticalWidthScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
          <label>
            Height Scale: {{ leftVerticalHeightScale }}
            <input
              type="range"
              [(ngModel)]="leftVerticalHeightScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
        </div>

        <div class="flex flex-col gap-3">
          <h3>Top Horizontal</h3>
          <label>
            Width Scale: {{ topHorizontalWidthScale }}
            <input
              type="range"
              [(ngModel)]="topHorizontalWidthScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
          <label>
            Height Scale: {{ topHorizontalHeightScale }}
            <input
              type="range"
              [(ngModel)]="topHorizontalHeightScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
        </div>

        <div class="flex flex-col gap-3">
          <h3>Right Vertical</h3>
          <label>
            Width Scale: {{ rightVerticalWidthScale }}
            <input
              type="range"
              [(ngModel)]="rightVerticalWidthScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
          <label>
            Height Scale: {{ rightVerticalHeightScale }}
            <input
              type="range"
              [(ngModel)]="rightVerticalHeightScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
        </div>

        <div class="flex flex-col gap-3">
          <h3>Bottom Horizontal</h3>
          <label>
            Width Scale: {{ bottomHorizontalWidthScale }}
            <input
              type="range"
              [(ngModel)]="bottomHorizontalWidthScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
          <label>
            Height Scale: {{ bottomHorizontalHeightScale }}
            <input
              type="range"
              [(ngModel)]="bottomHorizontalHeightScale"
              min="0.1"
              max="2"
              step="0.1"
            />
          </label>
        </div>
      </div>
    </div>
  `,
})
export class FullPieceComponent {
  // Variables de escala de cada pieza
  leftVerticalWidthScale: number = 1;
  leftVerticalHeightScale: number = 1;

  topHorizontalWidthScale: number = 1;
  topHorizontalHeightScale: number = 1;

  rightVerticalWidthScale: number = 1;
  rightVerticalHeightScale: number = 1;

  bottomHorizontalWidthScale: number = 1;
  bottomHorizontalHeightScale: number = 1;
}
