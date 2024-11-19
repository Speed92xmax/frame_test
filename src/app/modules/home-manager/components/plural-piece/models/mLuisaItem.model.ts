export class MLuisaItem {
  color?: string;
  height: number = 0;
  width: number = 0;
  frame?: boolean;
  frameThick: number = 0;
}

export class PaspartuItem {
  type?: string = 'paspartu';
  height?: number = 0;
  width?: number = 0;
  fill?: string = '';
}

export class IntraFrameItem {
  type?: string = 'intraFrame';
  thick?: number = 0;
  fill?: string = '';
}

export class FrameItem {
  type?: string = 'intraFrame';
  thick?: number = 0;
  fill?: string = '';
}
