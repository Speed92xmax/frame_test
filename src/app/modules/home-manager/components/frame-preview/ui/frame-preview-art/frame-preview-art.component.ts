import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'frame-preview-art',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="art relative z-[1]"
      [style.width.px]="width"
      [style.height.px]="height"
      [style.backgroundColor]="color"
      [style.zIndex]="1"
    >
      <img [src]="imageUrl" alt="" />
    </div>
  `,
  styles: ``,
})
export class FramePreviewArtComponent {
  @Input() width: any = 300;
  @Input() height: any = 400;
  @Input() imageUrl?: string;
  @Input() frameThickness?: number;
  @Input() color?: string;
}
