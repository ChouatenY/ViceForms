import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Logo = (props: { url?: string; color?: string }) => {
  const { url = "/", color = "text-white" } = props;
  return (
    <div
      className="flex items-center justify-center
  sm:justify-start
    "
    >
      <Link href={url} className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="ViceForms Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <h5
          className={cn(
            `font-bold text-[20px]
               tracking-[-0.07em] `,
            color
          )}
        >
          ViceForms
        </h5>
      </Link>
    </div>
  );
};

export default Logo;
