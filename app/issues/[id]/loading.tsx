import { Skeleton, SkeletonTheme } from "@/app/components";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonTheme
        baseColor="hsl(272, 51.0%, 54.0%)"
        highlightColor="hsl(272, 51.0%, 74.0%)"
      >
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
      </SkeletonTheme>
    </Box>
  );
};

export default LoadingIssueDetailPage;
