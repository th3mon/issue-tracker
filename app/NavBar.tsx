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

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: Endpoints.ISSUES },
  ];

  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const isAuthenticated = () => status === "authenticated";
  const isUnauthenticated = () => status === "unauthenticated";

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link className="hover:text-zinc-500 transition-colors" href="/">
              <GiBugNet />
            </Link>
            <ul className="flex gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-300": link.href === currentPath,
                      "text-zinc-400": link.href !== currentPath,
                      "hover:text-zinc-500 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {isAuthenticated() && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button radius="full" className="!p-0">
                    <Avatar
                      src={session!.user!.image!}
                      fallback="?"
                      size="2"
                      radius="full"
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
            )}
            {isUnauthenticated() && (
              <Link href={Endpoints.API_SIGNIN}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
