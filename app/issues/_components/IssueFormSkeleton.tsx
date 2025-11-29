import { Box } from "@radix-ui/themes";
import { Skeleton, SkeletonThemeWithSetup } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonThemeWithSetup>
        <Skeleton height="2rem" />
        <Skeleton height="12rem" />
      </SkeletonThemeWithSetup>
    </Box>
  );
};

export default IssueFormSkeleton;
