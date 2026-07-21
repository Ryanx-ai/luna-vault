import Image from "next/image";
import { cn } from "@/lib/utils";

export function LunaVaultLogo({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-8 w-32", className)} aria-label="Luna Vault">
      <Image
        src="/brand/luna-vault-full.png"
        alt="Luna Vault"
        fill
        className="object-contain object-left"
        sizes="128px"
        priority
      />
    </span>
  );
}
