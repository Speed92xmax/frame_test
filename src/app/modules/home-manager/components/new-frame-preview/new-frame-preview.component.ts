import { Component } from '@angular/core';
import { layerItem } from './frame-element.model';

@Component({
  selector: 'new-frame-preview',
  standalone: true,
  imports: [],
  template: `
    <section class="flex h-full w-full">
      <div class="grow plane relative plane h-full w-full">
        <!--  <div class="bg-black art"></div> -->
        <div class="bg-pink-300 mluisa"></div>
      </div>
    </section>
  `,
  styles: [
    `
      .plane {
        transform-origin: center;
      }

      .art {
        height: 100mm;
        width: 100mm;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .mluisa {
        height: 10mm;
        width: 10mm;
        position: absolute;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class NewFramePreviewComponent {
  layerList: Array<layerItem> = [];

  getStyle() {
    return `${
      'height:' +
      100 +
      'mm;width:' +
      100 +
      'mm;position:absolute;top:' +
      100 +
      'mm;left:' +
      100 +
      'mm;'
    }`;
  }
}
