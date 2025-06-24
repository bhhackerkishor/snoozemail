import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type AccordionTriggerProps = {
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;

type AccordionContentProps = {
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn(
      "overflow-hidden text-sm data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
);
