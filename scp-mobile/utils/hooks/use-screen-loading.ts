import { useEffect, useState } from "react";

const useScreenLoading = () => {
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(false);
  }, [])
  return { screenLoading };
}

export default useScreenLoading;