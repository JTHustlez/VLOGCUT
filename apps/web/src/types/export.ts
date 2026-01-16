// Extend Window interface for File System Access API
declare global {
  interface Window {
    showSaveFilePicker?: (options?: {
      suggestedName?: string;
      types?: Array<{
        description?: string;
        accept: Record<string, string[]>;
      }>;
    }) => Promise<FileSystemFileHandle>;
  }
}

export type ExportFormat = "mp4" | "webm";
export type ExportQuality = "low" | "medium" | "high" | "very_high";
export type ExportMode = "buffer" | "stream";

export interface ExportOptions {
  format: ExportFormat;
  quality: ExportQuality;
  fps?: number;
  includeAudio?: boolean;
  onProgress?: (progress: number) => void;
  onCancel?: () => boolean;
  // Stream export options
  mode?: ExportMode; // 'buffer' (default) or 'stream'
  fileHandle?: FileSystemFileHandle; // Required when mode is 'stream'
}

export interface ExportResult {
  success: boolean;
  buffer?: ArrayBuffer; // Only present when mode is 'buffer'
  error?: string;
  cancelled?: boolean;
}

// Check if File System Access API is supported
export function isStreamExportSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "showSaveFilePicker" in window &&
    typeof window.showSaveFilePicker === "function"
  );
}

// Get file handle for stream export
export async function getExportFileHandle({
  suggestedName,
  format,
}: {
  suggestedName: string;
  format: ExportFormat;
}): Promise<FileSystemFileHandle | null> {
  if (!isStreamExportSupported()) {
    return null;
  }

  try {
    const handle = await window.showSaveFilePicker!({
      suggestedName: `${suggestedName}.${format}`,
      types: [
        {
          description: format === "mp4" ? "MP4 Video" : "WebM Video",
          accept: {
            [format === "mp4" ? "video/mp4" : "video/webm"]: [`.${format}`],
          },
        },
      ],
    });
    return handle;
  } catch (error) {
    // User cancelled the picker
    if ((error as Error).name === "AbortError") {
      return null;
    }
    throw error;
  }
}
