export interface ModalProps {
  message: string;
  btnText: string;
  cancelText?: string;
  cancelFn?: ((param?: any) => void) | null;
  submitFn?: ((param?: any) => void) | null;
}

export interface setModalProps {
  ({ message, btnText, cancelFn, submitFn }: ModalProps): void;
}
