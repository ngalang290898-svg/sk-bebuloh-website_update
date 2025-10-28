"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export default function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section id={id} className="py-20 bg-pastel-bg">
      <div className="container mx-auto px-4">
        <h2 className="font-montserrat font-bold text-3xl text-primary text-center mb-10">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
