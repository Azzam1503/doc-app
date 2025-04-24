"use client";
import React from "react";
import { Button } from "./ui/button";
import { Delete, ExternalLink, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLink className="size-4 mr-2" />
          Open in a new tab
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
