import { useEffect, useRef } from "react";

type LoadMoreTriggerProps = {
  onLoadMore: () => void;
};

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({ onLoadMore }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [onLoadMore]);

  return <div ref={loaderRef} className="h-10"></div>;
};

export default LoadMoreTrigger;
