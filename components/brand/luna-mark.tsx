import Image from "next/image";
import { cn } from "@/lib/utils";

export function LunaMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative size-6", className)} aria-label="Luna Vault">
      <Image
        src="/brand/luna-logomark.png"
        alt=""
        fill
        className="object-contain"
        sizes="24px"
        priority
      />
    </div>
  );
}
