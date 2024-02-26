import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Keywords from "../../components/main/keywords";
import Recommend from "../../components/main/recommend";
import { describe, it } from "node:test";

describe("main", () => {
  it("로그인 되어 있을 때 키워드가 렌더링 되는지 확인", async () => {
    // render(<Keywords />);
    // const keyword = await screen.findAllByRole('button');
    // expect(keyword).toBeInTheDocument();
  });
});
