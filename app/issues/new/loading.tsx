import { Box } from "@radix-ui/themes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonTheme
        baseColor="hsl(272, 51.0%, 54.0%)"
        highlightColor="hsl(272, 51.0%, 74.0%)"
      >
        <Skeleton />
        <Skeleton height="20rem" />
      </SkeletonTheme>
    </Box>
  );
};

export default LoadingNewIssuePage;
