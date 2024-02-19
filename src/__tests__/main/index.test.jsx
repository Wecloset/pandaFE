import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Keywords from "../../components/main/keywords";
import Recommend from "../../components/main/recommend";

describe("main", () => {
  it("로그인 되어 있을 때 키워드가 렌더링 되는지 확인", async () => {
    // TODO: 유저 상태 로직 변경 후 테스트로직 구현
    // render(<Keywords />);
    // const keyword = await screen.findAllByRole('button');
    // expect(keyword).toBeInTheDocument();
  });
});
