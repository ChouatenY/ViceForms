import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const NavBar = () => {
  return (
    <div className="shadow-sm w-full sticky top-0 !bg-[#47423e]  dark:bg-gray-900 z-[9999]">
      <div className="w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between ">
        <div className="flex items-center flex-1 gap-9">
          <div>
            <Logo url="/" />
          </div>

          <div className="hidden lg:flex">
            <ul className="flex items-center gap-5 text-[14px] font-medium text-white dark:text-white">
              <li>
                <Link href="#">AI Features</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">Resources</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-transparent text-white">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
