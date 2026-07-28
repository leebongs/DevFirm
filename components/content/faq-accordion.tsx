"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ(§6.3). Radix Accordion 이 열림 상태를 다뤄야 해서 클라이언트 컴포넌트다
 * (§6.4 화이트리스트 등재 항목).
 */
export function FAQAccordion({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger className="text-left break-keep">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-[1.75] break-keep">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
