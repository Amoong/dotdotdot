export class PointerEventHandler {
  static pointerEventHandler: PointerEventHandler | undefined;

  private pressed: boolean;

  private constructor() {
    this.pressed = false;
  }

  static getPointerEventHandler() {
    this.pointerEventHandler = new PointerEventHandler();
  }

  onPointerDown() {
    this.pressed = true;
  }

  onPointerUp() {
    this.pressed = false;
  }
}
