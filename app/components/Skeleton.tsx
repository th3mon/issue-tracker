import { PropsWithChildren } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonThemeWithSetup = ({ children }: PropsWithChildren) => (
  <SkeletonTheme baseColor="var(--accent-9)" highlightColor="var(--accent-11)">
    {children}
  </SkeletonTheme>
);

export { SkeletonThemeWithSetup, Skeleton };
