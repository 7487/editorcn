"use client";

import { CopyButton } from "@/components/copy-button";
import { getIconForPackageManager } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { PackageManager } from "@/hooks/use-package-manager";
import { usePackageManager } from "@/hooks/use-package-manager";
import { cn } from "@/lib/utils";

const pmCommands = {
  bun: "bunx --bun",
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn",
};

const installCommand = "shadcn@latest add";

export const CommandBox = ({ className }: { className?: string }) => {
  const [packageManager, setPackageManager] = usePackageManager();

  return (
    <div
      className={cn(
        "bg-code text-code-foreground relative overflow-hidden rounded-lg text-sm",
        className
      )}
    >
      <Tabs
        className="gap-0"
        onValueChange={(value: string) => {
          setPackageManager(value as PackageManager);
        }}
        value={packageManager}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0 [&_svg]:me-2 [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForPackageManager(packageManager)}

            {Object.entries(pmCommands).map(([key]) => (
              <TabsTrigger
                key={key}
                className="data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                value={key}
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <pre className="-translate-y-px px-4 py-3.5">
          <code
            data-language="bash"
            className="text-left block font-mono text-sm text-muted-foreground max-sm:leading-6"
          >
            {Object.entries(pmCommands).map(([key, command]) => (
              <TabsContent key={key} value={key} asChild>
                <span className="block sm:inline-block">
                  <span className="select-none">$ </span>
                  {command} {installCommand}{" "}
                  <span className="select-none sm:hidden" aria-hidden="true">
                    \
                  </span>
                </span>
              </TabsContent>
            ))}

            <span className="text-foreground">@rtecn/editor</span>
          </code>
        </pre>
      </Tabs>

      <CopyButton
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        value={`${pmCommands[packageManager]} ${installCommand} @rtecn/editor`}
        event="copy_npm_command"
      />
    </div>
  );
};
