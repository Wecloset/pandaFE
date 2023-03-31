export interface ModalProps {
  message: string;
  btnText: string;
  cancel?: ((param?: any) => void) | null;
  submit?: ((param?: any) => void) | null;
}

export interface setModalProps {
  ({ message, cancel, submit, btnText }: ModalProps): void;
}
