"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RemoveDialogProps {
  documentId: string;
  initailTitle: string;
  children: React.ReactNode;
}

const RenameDocument = ({
  documentId,
  initailTitle,
  children,
}: RemoveDialogProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState(initailTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsRenaming(true);
      const res = await fetch(`/api/document/rename/${documentId}`, {
        method: "PATCH",
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        throw new Error("Failed to update document");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRenaming(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Change the document title from here.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              disabled={isRenaming}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isRenaming}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDocument;
