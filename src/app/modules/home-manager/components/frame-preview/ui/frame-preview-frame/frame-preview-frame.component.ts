import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'frame-preview-frame',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="frame-top" [ngStyle]="topStyle"></div>
    <div class="frame-bottom" [ngStyle]="bottomStyle"></div>
    <div class="frame-left" [ngStyle]="leftStyle"></div>
    <div class="frame-right" [ngStyle]="rightStyle"></div>
  `,
  styles: [
    `
      .frame-top,
      .frame-bottom,
      .frame-left,
      .frame-right {
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      .frame-top,
      .frame-bottom {
        width: 100%;
        height: var(--frame-thickness);
      }
      .frame-left,
      .frame-right {
        height: 100%;
        width: var(--frame-thickness);
      }
    `,
  ],
})
export class FramePreviewFrameComponent {
  @Input() frameThickness!: number | undefined;
  @Input() color!: string | undefined;
  @Input() width!: number;
  @Input() height!: number;

  get topStyle() {
    return {
      top: `-${this.frameThickness}px`,
      left: `-${this.frameThickness}px`,
      backgroundColor: this.color,
      width: `${this.width + (this.frameThickness || 0) * 2}px`,
      height: `${this.frameThickness}px`,
    };
  }

  get bottomStyle() {
    return {
      bottom: `-${this.frameThickness}px`,
      left: `-${this.frameThickness}px`,
      backgroundColor: this.color,
      width: `${
        this.width + (this.frameThickness ? this.frameThickness : 0) * 2
      }px`,
      height: `${this.frameThickness}px`,
    };
  }

  get leftStyle() {
    return {
      top: `-${this.frameThickness}px`,
      left: `-${this.frameThickness}px`,
      backgroundColor: this.color,
      height: `${
        this.height + (this.frameThickness ? this.frameThickness : 0) * 2
      }px`,
      width: `${this.frameThickness}px`,
    };
  }

  get rightStyle() {
    return {
      top: `-${this.frameThickness}px`,
      right: `-${this.frameThickness}px`,
      backgroundColor: this.color,
      height: `${
        this.height + (this.frameThickness ? this.frameThickness : 0) * 2
      }px`,
      width: `${this.frameThickness}px`,
    };
  }
}
