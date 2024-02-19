export interface KeywordsProps {
  keywords: { id: number; tag: string }[];
  keyword: string;
  onClickKeyword: (tagName: string) => void;
}
