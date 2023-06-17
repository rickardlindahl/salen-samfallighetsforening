import { cn } from "~/lib/utils";

function OuterContainer({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"div">>) {
  return (
    <div className={cn("sm:px-8", className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
}

function InnerContainer({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"div">>) {
  return (
    <div className={cn("relative px-4 sm:px-8 lg:px-12", className)} {...props}>
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
}

export function Container({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"div">>) {
  return (
    <OuterContainer {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
}

Container.Outer = OuterContainer;
Container.Inner = InnerContainer;
