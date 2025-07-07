"use client";
import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, User, RefreshCw } from "lucide-react";
import { useLocalUser } from "@/hooks/use-local-user";

const Header = () => {
  const { user, clearUser } = useLocalUser();

  const pathname = usePathname();
  const { formId } = useParams();

  const NAV_MENUS = [
    {
      name: "Dashboard",
      pathname: "/dashboard",
      isDisabled: false,
    },
    {
      name: "Builder",
      pathname: `/dashboard/form/builder/${formId}`,
      isDisabled: true,
    },
    {
      name: "Responds",
      pathname: `/dashboard/form/responds/${formId}`,
      isDisabled: true,
    },
    {
      name: "Settings",
      pathname: "#",
      isDisabled: false,
    },
  ];

  return (
    <header
      className="
    sticky top-0 z-50 flex h-16 items-center gap-4 
    !bg-[#47423e] px-4 md:px-6
    "
    >
      <nav
        className="gap-6 w-full h-full
           text-lg font-medium flex justify-between flex-row"
      >
        <div
          className="flex flex-1 items-center mr-5 pr-8
         border-r border-gray-600"
        >
          <span className="sr-only">ViceForms</span>
        </div>
        <ul className="hidden md:flex flex-row">
          {NAV_MENUS.map((item, idx) => (
            <li key={idx} className="relative h-full">
              <Link
                href={item.pathname}
                className={cn(
                  `
                    text-white/90 text-[15.5px]
              font-normal z-[999] flex items-center px-3
              justify-center h-full transition-all duration-200
              hover:text-white hover:bg-secondary/10
                        `,
                  {
                    "opacity-80 !pointer-events-none": item.isDisabled,
                  }
                )}
              >
                {item.name}
              </Link>
              {pathname == item.pathname && (
                <div
                  className="absolute
                          top-0
                          left-0
                          right-0
                          h-[52px]
                          bg-secondary/20
                          transition-all
                          duration-300
                          ease-in-out
                          rounded-b-xl
                          -z-[1]
                          border-b-2 border-secondary"
                />
              )}
            </li>
          ))}
        </ul>

        <div
          className="flex 
        items-center gap-1
        justify-end w-full"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="flex
              items-start gap-2
              "
              >
                <Avatar
                  className="h-8 w-8 bg-gray-200 shrink-0
                rounded-full"
                >
                  <AvatarFallback className="rounded-lg">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <div
                    className="grid flex-1 text-left text-sm 
                  leading-tight
                  "
                  >
                    <span className="truncate font-semibold text-[#f2f2f2]">
                      {user?.name || "Local User"}
                    </span>
                    <p
                      className="truncate
                        block
                        w-full
                        max-w-[150px] text-xs
                     text-white/50"
                    >
                      ID: {user?.id?.slice(0, 8) || "Loading..."}
                    </p>
                  </div>
                  <ChevronDown className="ml-auto size-4 text-white/80" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={clearUser}
                className="flex items-center gap-1 cursor-pointer hover:bg-secondary/20 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Reset User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
