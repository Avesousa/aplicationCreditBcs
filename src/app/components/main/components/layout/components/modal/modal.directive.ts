export interface ModalDirective {
  title: string;
  size: string;

  buttonCloseDefined?: boolean;
  buttonClose?(): any;
  buttonCloseLabel: string;

  buttonDimiss?(): Promise<boolean> | boolean;
  buttonDimissLabel?: string;

  buttonAction(): any;
  buttonActionLabel: String;

}
