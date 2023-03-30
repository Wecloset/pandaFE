export interface ModalProps {
  message: string;
  btnText: string;
  cancel?: ((param?: any) => void) | null;
  submit?: ((param?: any) => void) | null;
}
