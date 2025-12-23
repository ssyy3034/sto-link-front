import { Clock, MoreVertical, Edit, Copy, Trash, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ProjectStatus =
  | "DRAFTING"
  | "OUTLINE"
  | "EDITING"
  | "COMPLETED"
  | "IDEA";

interface BookCardProps {
  title: string;
  author: string;
  status: ProjectStatus;
  genre?: string;
  coverImage?: string;
  location?: string;
  length?: string;
  progress: number;
  lastEdited: string;
  onClick?: () => void;
  onAction?: (action: "rename" | "duplicate" | "delete") => void;
}

export function BookCard({
  title,
  author,
  status,
  genre,
  coverImage,
  length,
  lastEdited,
  onClick,
  onAction,
}: BookCardProps) {
  // Status Indicator Colors
  const getStatusColor = (s: ProjectStatus) => {
    switch (s) {
      case "COMPLETED":
        return "text-green-600";
      case "DRAFTING":
        return "text-primary"; // Sage Green
      case "EDITING":
        return "text-orange-500";
      case "OUTLINE":
        return "text-blue-500";
      default:
        return "text-stone-400";
    }
  };

  const getStatusLabel = (s: ProjectStatus) => {
    switch (s) {
      case "DRAFTING":
        return "Drafting"; // Or "집필중" if strict Korean
      case "COMPLETED":
        return "Completed";
      default:
        return s.charAt(0) + s.slice(1).toLowerCase();
    }
  };

  return (
    <div
      className="group relative flex flex-col h-full bg-white rounded-lg border border-stone-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Cover Image Area */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-stone-100">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <BookOpen className="h-12 w-12 opacity-50" />
          </div>
        )}

        {/* More Options Menu (Top Right) */}
        <div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-600 rounded-full shadow-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onAction?.("rename")}>
                <Edit className="mr-2 h-4 w-4" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction?.("duplicate")}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAction?.("delete")}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Area (Spec 4.2 match) */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <div>
          <h3 className="font-heading text-lg font-bold text-stone-900 leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-stone-400 font-medium">{author}</p>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1.5">
          {genre ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-stone-50 text-stone-500 border border-stone-100">
              {genre}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-stone-50 text-stone-300 border border-stone-100">
              No Genre
            </span>
          )}
        </div>

        {/* Last Edited */}
        <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-auto">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated {lastEdited}</span>
        </div>

        {/* Status Line */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gaps-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full mr-2",
                getStatusColor(status),
              )}
            />
            <span className="text-xs font-semibold text-stone-600">
              {getStatusLabel(status)}
            </span>
          </div>

          {/* Optional: Words/Length if available (not strictly in spec small card, but useful) */}
          {length && <span className="text-xs text-stone-400">{length}</span>}
        </div>
      </div>
    </div>
  );
}
