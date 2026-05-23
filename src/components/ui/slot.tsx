import * as React from "react"

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}

function Slot({ children, ...props }: SlotProps) {
  if (!React.isValidElement<Record<string, unknown>>(children)) {
    return null
  }

  const childProps = children.props
  const className = [childProps.className, props.className].filter(Boolean).join(" ")

  return React.cloneElement(children, {
    ...props,
    ...childProps,
    className,
  })
}

export { Slot }
