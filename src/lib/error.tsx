export const errorLine = (error: any) =>
  `${
    error && "border-b-error"
  } && "border-b-error" mb-2  h-9 border-b-2 px-2 text-black placeholder:text-textColor-gray-100`;

export const errorMessage = (error: any, type: string, message: string) => {
  return error === type && <p className="mb-2 px-2 text-error">{message}</p>;
};
