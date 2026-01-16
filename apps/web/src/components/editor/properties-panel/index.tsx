"use client";

import { useMediaStore } from "@/stores/media-store";
import { useTimelineStore } from "@/stores/timeline-store";
import { ScrollArea } from "../../ui/scroll-area";
import { AudioProperties } from "./audio-properties";
import { MediaProperties } from "./media-properties";
import { TextProperties } from "./text-properties";
import { SquareSlashIcon, Sparkles } from "lucide-react";

export function PropertiesPanel() {
  const { selectedElements, tracks } = useTimelineStore();
  const { mediaFiles } = useMediaStore();

  return (
    <>
      {selectedElements.length > 0 ? (
        <ScrollArea className="h-full bg-panel rounded-sm border-l border-border/30">
          {selectedElements.map(({ trackId, elementId }) => {
            const track = tracks.find((t) => t.id === trackId);
            const element = track?.elements.find((e) => e.id === elementId);

            if (element?.type === "text") {
              return (
                <div key={elementId}>
                  <TextProperties element={element} trackId={trackId} />
                </div>
              );
            }
            if (element?.type === "media") {
              const mediaFile = mediaFiles.find(
                (file) => file.id === element.mediaId
              );

              if (mediaFile?.type === "audio") {
                return <AudioProperties key={elementId} element={element} />;
              }

              return (
                <div key={elementId}>
                  <MediaProperties element={element} />
                </div>
              );
            }
            return null;
          })}
        </ScrollArea>
      ) : (
        <EmptyView />
      )}
    </>
  );
}

function EmptyView() {
  return (
    <div className="bg-panel h-full p-4 flex flex-col items-center justify-center gap-4 border-l border-border/30">
      <div className="relative">
        <SquareSlashIcon
          className="w-12 h-12 text-muted-foreground/50"
          strokeWidth={1.5}
        />
        <Sparkles className="w-4 h-4 text-primary/50 absolute -top-1 -right-1" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-lg font-medium text-foreground/80">No Selection</p>
        <p className="text-sm text-muted-foreground text-balance max-w-[200px]">
          Click an element on the timeline to edit its properties
        </p>
      </div>
    </div>
  );
}
