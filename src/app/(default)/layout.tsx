import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TopBanner } from "@/components/layout/top-banner";
import { SocialsFooter } from "@/components/layout/socials-footer";
import { Link } from "@/components/custom/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col gap-4 p-4 sm:p-2">
        <div className="flex flex-col gap-4 sm:gap-8 w-full mx-auto relative min-h-full h-full rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-[2px] sm:p-8">
          {children}
        </div>
      </main>
    </>
  );
}
