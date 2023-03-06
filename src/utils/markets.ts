export const categoryToEng = (category: string) => {
  switch (category) {
    case "상의":
      return "TOP";
    case "하의":
      return "BOTTOM";
    case "아우터":
      return "OUTER";
    case "가방":
      return "BAG";
    case "기타":
      return "OTHER";
    default:
      return;
  }
};
export const firstToUppercase = (brand: string) => {
  return `${brand[0].toUpperCase()}${brand.slice(1)}`;
};
export const priceAddComma = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
