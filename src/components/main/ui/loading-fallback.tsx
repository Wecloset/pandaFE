import RecommendSkeleton from "./recommend-skeleton";

const LoadingFallback = () => {
  return (
    <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
      {Array(4)
        .fill("")
        .map((_, i) => (
          <RecommendSkeleton key={i} />
        ))}
    </div>
  );
};

export default LoadingFallback;
