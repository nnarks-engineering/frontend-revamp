import { cn } from "@/shared/lib/utils";
import type { DocumentFileType } from "@/types/enums";
import { FileText, FileImage, FileVideo, FileAudio, Sheet, FileType2, File } from "lucide-react";

/**
 * Returns a color and icon for each document file type.
 */
function getFileTypeMeta(fileType: DocumentFileType) {
  switch (fileType) {
    case "PDF":
      return { color: "text-red-600 bg-red-50", label: "PDF", Icon: FileText };
    case "IMAGE":
      return { color: "text-blue-600 bg-blue-50", label: "IMG", Icon: FileImage };
    case "VIDEO":
      return { color: "text-purple-600 bg-purple-50", label: "VID", Icon: FileVideo };
    case "AUDIO":
      return { color: "text-amber-600 bg-amber-50", label: "AUD", Icon: FileAudio };
    case "SPREADSHEET":
      return { color: "text-emerald-600 bg-emerald-50", label: "XLS", Icon: Sheet };
    case "WORD":
      return { color: "text-blue-700 bg-blue-50", label: "DOC", Icon: FileType2 };
    case "TEXT":
    default:
      return { color: "text-slate-600 bg-slate-50", label: "TXT", Icon: File };
  }
}

interface DocumentFileIconProps {
  fileType: DocumentFileType;
  className?: string;
}

/**
 * Renders a stylized file icon with a file-type badge.
 * Matches the reference design: large file silhouette + small colored badge.
 */
export function DocumentFileIcon({ fileType, className }: DocumentFileIconProps) {
  const { color, label } = getFileTypeMeta(fileType);

  return (
    <div className={cn("relative shrink-0 w-11 h-13 flex items-center justify-center", className)}>
      {/* File silhouette */}
      <svg
        className="w-full h-full text-muted-foreground/20"
        viewBox="0 0 44 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 0C1.79086 0 0 1.79086 0 4V52C0 54.2091 1.79086 56 4 56H40C42.2091 56 44 54.2091 44 52V14L30 0H4Z"
          fill="currentColor"
        />
        <path
          d="M30 0L44 14H34C31.7909 14 30 12.2091 30 10V0Z"
          fill="currentColor"
          className="opacity-60"
        />
      </svg>

      {/* File-type badge */}
      <span
        className={cn(
          "absolute bottom-1 left-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm leading-none",
          color,
        )}
      >
        {label}
      </span>
    </div>
  );
}
