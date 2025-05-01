"use client";
import React from "react";
import { Button } from "./ui/button";
import { ExternalLink, MoreVertical, Pen, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import RemoveDialog from "./RemoveDialog";
import RenameDocument from "./RenameDocument";

const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: {
  documentId: string;
  title: string;
  onNewTab: (id: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </RemoveDialog>
        <RenameDocument documentId={documentId} initailTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <Pen className="size-4 mr-2" />
            Reanme Title
          </DropdownMenuItem>
        </RenameDocument>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLink className="size-4 mr-2" />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
