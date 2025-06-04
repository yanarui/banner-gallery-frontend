import { useEffect, useRef } from "react";

type LoadMoreTriggerProps = {
  onLoadMore: () => void;
};

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({ onLoadMore }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [onLoadMore]);

  return <div ref={loaderRef} className="h-10"></div>;
};

export default LoadMoreTrigger;
