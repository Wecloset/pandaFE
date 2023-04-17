import React, { ComponentProps, Suspense, useEffect, useState } from "react";

const NextSuspense = (props: ComponentProps<typeof Suspense>) => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (isMount) return <Suspense {...props} />;

  return <>{props.fallback}</>;
};

export default NextSuspense;
