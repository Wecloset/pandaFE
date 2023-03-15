import MainLookBookItem from "./lookbook-item";

const MainLookbook = () => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="px-5 text-xl">Look Book</h2>
        <p className="px-5 text-textColor-gray-100">회원 스타일 피드</p>
      </div>
      <div className="border border-t-common-black border-b-common-black">
        <ul className="flex">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <MainLookBookItem key={idx} username="username" />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MainLookbook;
