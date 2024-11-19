import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeFrameTopComponent } from './components/home-frame-top/home-frame-top.component';
import { CornerLeftComponent } from './components/corner-left/corner-left.component';
import { FullPieceComponent } from './components/full-piece/full-piece.component';
import { SinglePieceComponent } from './components/single-piece/single-piece.component';
import { FramePickerComponent } from './components/frame-picker/frame-picker.component';
import { PluralPieceComponent } from './components/plural-piece/plural-piece.component';
import { FramePreviewComponent } from './components/frame-preview/frame-preview.component';
import { NewFramePreviewComponent } from './components/new-frame-preview/new-frame-preview.component';
import { FrameCutComponent } from './components/frame-cut/frame-cut.component';
import { DynamicSvgComponent } from './components/dynamic-svg/dynamic-svg.component';

@Component({
  selector: 'home-manager',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeFrameTopComponent,
    CornerLeftComponent,
    FullPieceComponent,
    SinglePieceComponent,
    FramePickerComponent,
    PluralPieceComponent,
    FramePreviewComponent,
    NewFramePreviewComponent,
    FrameCutComponent,
    DynamicSvgComponent,
  ],
  template: `
    <section class="h-screen w-full">
      <!--       <home-frame-top /> -->
      <!-- <corner-left /> -->
      <!-- <full-piece /> -->
      <!-- <single-piece /> -->
      <!-- <frame-picker class="w-3/4" /> -->
      <!-- <plural-piece /> -->
      <!-- <frame-preview /> -->
      <!-- <new-frame-preview /> -->
      <!-- <frame-cut /> -->
      <app-dynamic-svg />
    </section>
  `,
  styles: ``,
})
export class HomeManagerComponent {}
