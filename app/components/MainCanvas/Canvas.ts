export class Canvas {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;

    const ctx = this.$canvas.getContext("2d");

    if (ctx === null) {
      throw new Error("Cannot get context");
    }

    this.ctx = ctx;
  }
}
