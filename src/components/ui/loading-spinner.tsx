import { NextPage } from "next";
import { ThreeDots } from "react-loader-spinner";

//주소 : https://mhnpd.github.io/react-loader-spinner/docs/category/components

const LoadingSpinner: NextPage<{ width?: string }> = ({ width }) => {
  return (
    <div className="flex items-center justify-center">
      <ThreeDots
        height="80"
        width={width ? Number(width) : 80}
        radius="9"
        color="#B095FF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
