import { PropsWithChildren } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonThemeWithSetup = ({ children }: PropsWithChildren) => (
  <SkeletonTheme
    baseColor="hsl(272, 51.0%, 54.0%)"
    highlightColor="hsl(272, 51.0%, 74.0%)"
  >
    {children}
  </SkeletonTheme>
);

export { SkeletonThemeWithSetup, Skeleton };
