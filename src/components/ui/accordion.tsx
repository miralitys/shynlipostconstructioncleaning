"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type AccordionContextValue = {
  value: string | undefined
  collapsible: boolean
  setValue: (value: string | undefined) => void
}

type AccordionItemContextValue = {
  value: string
  open: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

function Accordion({
  className,
  type = "single",
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  type?: "single"
  collapsible?: boolean
  defaultValue?: string
  value?: string
  onValueChange?: (value: string | undefined) => void
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const value = controlledValue ?? uncontrolledValue

  const setValue = React.useCallback(
    (nextValue: string | undefined) => {
      setUncontrolledValue(nextValue)
      onValueChange?.(nextValue)
    },
    [onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value, collapsible, setValue }}>
      <div
        data-slot="accordion"
        data-type={type}
        className={className}
        {...props}
      />
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  className,
  value,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const accordion = React.useContext(AccordionContext)
  const open = accordion?.value === value

  return (
    <AccordionItemContext.Provider value={{ value, open }}>
      <div
        data-slot="accordion-item"
        data-state={open ? "open" : "closed"}
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const accordion = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)

  if (!accordion || !item) {
    throw new Error("AccordionTrigger must be used inside AccordionItem.")
  }

  const toggle = () => {
    accordion.setValue(
      item.open && accordion.collapsible ? undefined : item.value
    )
  }

  return (
    <h3 className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={item.open ? "open" : "closed"}
        aria-expanded={item.open}
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        onClick={toggle}
        {...props}
      >
        {children}
        <span className="accordion-chevron" aria-hidden="true">⌄</span>
      </button>
    </h3>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const item = React.useContext(AccordionItemContext)

  if (!item) {
    throw new Error("AccordionContent must be used inside AccordionItem.")
  }

  return (
    <div
      data-slot="accordion-content"
      data-state={item.open ? "open" : "closed"}
      hidden={!item.open}
      className="overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
