import { Skeleton, SkeletonThemeWithSetup } from "@/app/components";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonThemeWithSetup>
        <Heading>
          <Skeleton />
        </Heading>
        <Flex gap="3" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose prose-slate prose-headings:text-slate-400 prose-strong:text-slate-500 prose-em:text-slate-400 prose-li:text-slate-400 prose-p:text-slate-300 mt-4">
          <Skeleton count={3} />
        </Card>
      </SkeletonThemeWithSetup>
    </Box>
  );
};

export default LoadingIssueDetailPage;
