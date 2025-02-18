import { cn } from "src/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("tw-animate-pulse tw-rounded-md tw-bg-muted", className)}
      {...props} />)
  );
}

export { Skeleton }
