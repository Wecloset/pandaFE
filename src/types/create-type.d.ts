import { ProductData } from "./data-type";

export interface CreateState {
  [key: string]: string | number | FileList | undefined;
}

export interface CredentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

export interface Options {
  [key: string]: {
    name: string;
    current: boolean;
    list: string[];
  };
}

export interface OptionTabProps {
  options: Options;
  isTabOpen?: boolean;
  selectOptionItem?: (event: MouseEvent<HTMLLIElement>, name: string) => void;
  submitBrand?: (event: FormEvent<HTMLFormElement>, brandName: string) => void;
  closeTab?: () => void;
  register?: UseFormRegister<CreateState>;
  setValue?: UseFormSetValue<CreateState>;
  onSetItems?: (list: ProductData[]) => void;
}
