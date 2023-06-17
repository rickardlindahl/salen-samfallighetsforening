import Link from "next/link";

import { cn } from "~/lib/utils";
import { Icons } from "./icons";

export type CardComponent = Extract<
  keyof React.JSX.IntrinsicElements,
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "b"
  | "article"
  | "section"
  | "time"
  | "div"
>;

export function Card<T extends CardComponent = "div">({
  as,
  className,
  children,
}: React.PropsWithChildren<{
  as?: T;
  className?: string;
}>) {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component
      className={cn(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
}

Card.Link = function CardLink({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle<T extends CardComponent = "h2">({
  as,
  href,
  children,
}: React.PropsWithChildren<{
  as?: T;
  href?: string;
}>) {
  const Component = (as ?? "h2") as React.ElementType;
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: React.PropsWithChildren) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
};

Card.Cta = function CardCta({ children }: React.PropsWithChildren) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <Icons.arrowRight className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Eyebrow = function CardEyebrow<T extends CardComponent = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: React.PropsWithChildren<{
  as?: T;
  decorate?: boolean;
  className?: string;
}> &
  React.JSX.IntrinsicElements[T]) {
  const Component = (as ?? "h2") as React.ElementType;
  return (
    <Component
      className={cn(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5",
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};
