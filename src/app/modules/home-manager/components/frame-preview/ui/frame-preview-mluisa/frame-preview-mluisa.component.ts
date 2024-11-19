import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'frame-preview-mluisa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="marialuisa-layer absolute"
      [ngStyle]="{
        width: totalWidth + widthThick + 'px',
        height: totalHeight + heightThick + 'px',
        backgroundColor: color ? color : 'black',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        zIndex: '-' + zIndex
      }"
    ></div>
  `,
  styles: [
    `
      .marialuisa-layer {
        box-sizing: border-box;
      }
    `,
  ],
})
export class FramePreviewMluisaComponent {
  @Input() totalWidth!: number;
  @Input() totalHeight!: number;
  @Input() heightThick!: number;
  @Input() widthThick!: number;
  @Input() color?: string;
  @Input() zIndex?: number;

  ngOnInit() {
    console.log(this.zIndex);
  }
}
