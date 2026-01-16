"use client";

import { cn } from "@/lib/utils";
import { Tab, tabs, useMediaPanelStore } from "./store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";

export function TabBar() {
  const { activeTab, setActiveTab } = useMediaPanelStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const checkScrollPosition = () => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollTop, scrollHeight, clientHeight } = element;
    setShowTopFade(scrollTop > 0);
    setShowBottomFade(scrollTop < scrollHeight - clientHeight - 1);
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    checkScrollPosition();
    element.addEventListener("scroll", checkScrollPosition);
    
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex relative border-r border-border/30">
      <div 
        ref={scrollRef}
        className="h-full px-3 flex flex-col justify-start items-center gap-4 overflow-y-auto scrollbar-hidden relative w-full py-4"
      >
        {(Object.keys(tabs) as Tab[]).map((tabKey) => {
          const tab = tabs[tabKey];
          const isActive = activeTab === tabKey;
          return (
            <button
              type="button"
              className={cn(
                "flex z-[100] flex-col gap-0.5 items-center cursor-pointer transition-all duration-200 rounded-lg p-2",
                isActive
                  ? "text-primary bg-primary/10 shadow-[0_0_10px_hsl(185,100%,50%,0.2)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
              onClick={() => setActiveTab(tabKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveTab(tabKey);
                }
              }}
              key={tabKey}
            >
              <Tooltip delayDuration={10}>
                <TooltipTrigger asChild>
                  <tab.icon className={cn(
                    "size-[1.1rem]! transition-all duration-200",
                    isActive && "drop-shadow-[0_0_4px_hsl(185,100%,50%,0.5)]"
                  )} />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  variant="sidebar"
                  sideOffset={8}
                >
                  <div className="text-foreground text-sm font-medium leading-none">
                    {tab.label}
                  </div>
                </TooltipContent>
              </Tooltip>
            </button>
          );
        })}
      </div>
      
      <FadeOverlay direction="top" show={showTopFade} />
      <FadeOverlay direction="bottom" show={showBottomFade} />
    </div>
  );
}

function FadeOverlay({ direction, show }: { direction: "top" | "bottom", show: boolean }) {
  return (
    <div 
      className={cn(
        "absolute left-0 right-0 h-6 pointer-events-none z-[101] transition-opacity duration-200",
        direction === "top" 
          ? "top-0 bg-gradient-to-b from-panel to-transparent" 
          : "bottom-0 bg-gradient-to-t from-panel to-transparent",
        !show && "opacity-0"
      )}
    />
  );
}
