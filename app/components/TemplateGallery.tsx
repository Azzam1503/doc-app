"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: 1,
    label: "Blank Document",
    image: "/blank-document.svg",
  },
  {
    id: 2,
    label: "Bussiness Letter",
    image: "/business-letter.svg",
  },
  {
    id: 3,
    label: "Resume",
    image: "/resume.svg",
  },
  {
    id: 4,
    label: "Project Proposal",
    image: "/project-proposal.svg",
  },
  {
    id: 5,
    label: "Cover Letter",
    image: "/cover-letter.svg",
  },
  {
    id: 6,
    label: "letter",
    image: "/letter.svg",
  },
  {
    id: 7,
    label: "Software Proposal",
    image: "/software-proposal.svg",
  },
];

const TemplateGallery = () => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const createDocument = async () => {
    try {
      setIsCreating(true);
      const res = await fetch("/api/document/create", {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      router.push(`/documents/${data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="text-base font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                key={template.id}
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={createDocument}
                    style={{
                      backgroundImage: `url(${template.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transtion flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
