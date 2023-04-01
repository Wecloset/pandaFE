export const priceWord: { [key: string]: string } = {
  LOW: "30,000 이하",
  MEDIUM: "30,000 ~ 100,000",
  HIGH: "100,000 이상",
};

export const priceMapping = (price: number, word: string) => {
  switch (word) {
    case priceWord["LOW"]:
      return price <= 30000;
    case priceWord["MEDIUM"]:
      return price >= 30000 && price <= 100000;
    case priceWord["HIGH"]:
      return price >= 100000;
    default:
      return;
  }
};
