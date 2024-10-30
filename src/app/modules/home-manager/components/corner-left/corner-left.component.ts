import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'corner-left',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="h-screen w-full flex flex-col p-20 justify-center item ">
      <div class="grow w-full">
        <svg
          width="1000"
          height="840"
          [attr.viewBox]="getViewBox()"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="border-2 border-black"
        >
          <defs>
            <pattern
              id="horizontalFrameImg"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                xlink:href="../../../../../assets/frames/image 1.png"
                x="0"
                y="0"
                height="100"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
            <pattern
              id="horizontalFrameImgLarge"
              patternUnits="userSpaceOnUse"
              width="750"
              height="100"
            >
              <image
                xlink:href="../../../../../assets/frames/image 1.png"
                x="0"
                y="0"
                width="750"
                height="100"
                preserveAspectRatio="none"
              />
            </pattern>
            <pattern
              id="verticalFrameImg"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                xlink:href="../../../../../assets/frames/frame-vertical.png"
                x="0"
                y="0"
                width="100"
                height="150"
                preserveAspectRatio="xMidYMid slice"
                transform="rotate(180 50 75)"
              />
            </pattern>
            <pattern
              id="verticalFrameImgLarge"
              patternUnits="userSpaceOnUse"
              width="150"
              height="650"
            >
              <image
                xlink:href="../../../../../assets/frames/frame-vertical.png"
                x="0"
                y="-150"
                width="100"
                height="500"
                preserveAspectRatio="xMidYMid slice"
                transform="rotate(180 50 250)"
              />
            </pattern>
            <pattern
              id="artImg"
              patternUnits="userSpaceOnUse"
              width="800"
              height="650"
            >
              <image
                xlink:href="https://picsum.photos/800/650"
                x="0"
                y="0"
                width="800"
                height="650"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>

          <path
            d="M0 0L100 100L150 100L150 0L0 0Z"
            fill="url(#horizontalFrameImg)"
          />
          <path d="M0 0L100 100V150H0V0Z" fill="url(#verticalFrameImg)" />
          <rect
            width="600"
            height="100"
            x="150"
            fill="url(#horizontalFrameImgLarge)"
          />
          <path
            d="M0 0L100 100L150 100L150 0L0 0Z"
            fill="url(#horizontalFrameImg)"
            transform="scale(-1, 1) translate(-900, 0)"
          />
          <path
            d="M0 0L100 100V150H0V0Z"
            fill="url(#verticalFrameImg)"
            transform="scale(-1, 1) translate(-900, 0)"
          />
          <rect
            width="100"
            height="450"
            x="0"
            y="150"
            fill="url(#verticalFrameImgLarge)"
          />
          <rect
            width="100"
            height="450"
            x="0"
            y="150"
            fill="url(#verticalFrameImgLarge)"
            transform="scale(-1, 1) translate(-900, 0)"
          />
          <path
            d="M0 0L100 100L150 100L150 0L0 0Z"
            fill="url(#horizontalFrameImg)"
            transform="translate(0,600) rotate(270,75,75)"
          />
          <path
            d="M0 0L100 100V150H0V0Z"
            fill="url(#verticalFrameImg)"
            transform="translate(0,600) rotate(270,75,75)"
          />
          <rect
            width="600"
            height="100"
            x="150"
            fill="url(#horizontalFrameImgLarge)"
            transform="translate(750,600) rotate(180,75,75)"
          />
          <path
            d="M0 0L100 100L150 100L150 0L0 0Z"
            fill="url(#horizontalFrameImg)"
            transform="translate(750,600) rotate(180,75,75)"
          />
          <path
            d="M0 0L100 100V150H0V0Z"
            fill="url(#verticalFrameImg)"
            transform="translate(750,600) rotate(180,75,75)"
          />
          <rect width="700" height="550" fill="#d7fceb" x="100" y="100"></rect>
          <rect
            width="650"
            height="500"
            fill="url(#artImg)"
            x="125"
            y="125"
          ></rect>
        </svg>
      </div>

      <div class="flex justify-between w-full p-10 gap-10">
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
  `,
  styles: [],
})
export class CornerLeftComponent {
  minX: number = 0;
  minY: number = 0;
  Vheight: number = 840;
  Vwidth: number = 1000;

  getViewBox(): string {
    return `${this.minX} ${this.minY} ${this.Vheight} ${this.Vwidth}`;
  }
}
