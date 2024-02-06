"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";

import { logOut } from "@/data/auth";
import axiosInstance from "@/data/axiosInstance";
import { useAuthContext } from "@/app/authContextProvider";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    await logOut();
    const response = await axiosInstance.post(`/api/logout`);

    if (response.status === 200) {
      router.push("/login");
    }
  };

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className=" basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {user && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                }}
                className="transition-transform"
                name={user?.email}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
