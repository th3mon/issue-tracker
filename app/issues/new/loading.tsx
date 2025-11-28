import { Box } from "@radix-ui/themes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonTheme
        baseColor="hsl(272, 51.0%, 54.0%)"
        highlightColor="hsl(272, 51.0%, 74.0%)"
      >
        <Skeleton height="2rem" />
        <Skeleton height="12rem" />
      </SkeletonTheme>
    </Box>
  );
};

export default LoadingNewIssuePage;
