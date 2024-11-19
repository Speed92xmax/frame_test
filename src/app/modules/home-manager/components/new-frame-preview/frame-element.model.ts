export class layerItem {
  type!: 'art' | 'paspartu' | 'frame';
  width!: number;
  height!: number;
  fill!: string;

  externalTopLeft?: number;
  externalTopRight?: number;
  externalBottomRight?: number;
  externalBottomLeft?: number;

  internalTopLeft?: number;
  internalTopRight?: number;
  internalBottomRight?: number;
  internalBottomLeft?: number;
}
