"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { LoaderIcon } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import DocumentMenu from "./DocumentMenu";

const DocumentTable = ({
  documents,
}: {
  documents: {
    id: string;
    userId: string;
    documentId: string;
    document: {
      title: string;
      createdAt: Date;
      updatedAt: Date;
    };
    role?: "OWNER" | "EDITOR" | "VIEWER";
  }[];
}) => {
  const onNewTabClick = (documentId: string) => {
    window.open(`/documents/${documentId}`, "_blank");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <LoaderIcon className="animate-spin text-muted-foreground size-5" />
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Document</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead>Shared</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Updated at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <TableRow className="cursor-pointer" key={doc.documentId}>
                  <TableCell className="w-[50px]">
                    <SiGoogledocs className="size-6 fill-blue-500" />
                  </TableCell>
                  <TableCell className="font-medium md:w-[40%]">
                    {doc.document.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                    Private
                  </TableCell>
                  <TableCell>
                    {format(new Date(doc.document.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(doc.document.updatedAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <DocumentMenu
                      documentId={doc.documentId}
                      title={doc.document.title}
                      onNewTab={onNewTabClick}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
};

export default DocumentTable;
