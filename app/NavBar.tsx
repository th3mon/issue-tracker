"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GiBugNet } from "react-icons/gi";
import { Endpoints } from "@/app/Endpoints";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton, SkeletonThemeWithSetup } from "@/app/components";

const NavBar = () => (
  <nav className="border-b mb-5 px-5 py-3">
    <Container>
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Logo />
          <NavigationLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </Container>
  </nav>
);

const Logo = () => (
  <Link className="hover:text-zinc-500 transition-colors" href="/">
    <GiBugNet />
  </Link>
);

const NavigationLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: Endpoints.ISSUES },
  ];

  const currentPath = usePathname();

  return (
    <ul className="flex gap-5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link--active": link.href === currentPath,
              "nav-link": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const isLoading = () => status === "loading";
  const isUnauthenticated = () => status === "unauthenticated";

  if (isLoading()) {
    return (
      <SkeletonThemeWithSetup>
        <Box className="relative w-8 h-8">
          <Skeleton
            width={30}
            height={30}
            circle={true}
            inline={true}
            style={{ position: "absolute" }}
          />
        </Box>
      </SkeletonThemeWithSetup>
    );
  }

  if (isUnauthenticated()) {
    return (
      <Link href={Endpoints.API_SIGNIN} className="nav-link leading-8">
        Login
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button radius="full" className="!p-0">
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              referrerPolicy="no-referrer"
            />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={Endpoints.API_SIGNOUT}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
