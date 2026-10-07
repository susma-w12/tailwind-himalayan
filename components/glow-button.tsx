// components/glow-button.tsx
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Orange glow button, all in Tailwind (the flow animation lives in globals.css).
// before: = blurred multi-color orange gradient behind the button. It flows on hover.
// after:  = solid warm-dark fill on top of the glow, so only the edge glows
// active: = while pressed, the fill goes transparent so the glow colors fill the button
const BASE =
  "group/glow relative isolate inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white " +
  "before:absolute before:-inset-[3px] before:-z-10 before:rounded-[inherit] before:content-[''] " +
  "before:bg-[linear-gradient(45deg,#ff1f00,#ff6a00,#ffa200,#ffd000,#ff6a00,#ff1f00,#ff8c00,#ffd000,#ff1f00)] " +
  "before:[background-size:400%_100%] before:blur-[10px] before:opacity-0 " +
  "before:transition-opacity before:duration-300 " +
  "hover:before:opacity-100 hover:before:animate-glow-flow " +
  "active:before:opacity-100 active:before:animate-glow-flow " +
  "after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-[#1f1209] after:content-[''] " +
  "after:shadow-[inset_0_0_0_1px_rgba(255,170,70,0.35)] after:transition-colors after:duration-200 " +
  "active:text-black active:after:bg-transparent active:after:shadow-none";
  
type CommonProps = {
  children: ReactNode;
  className?: string;
  /** Show a small arrow that nudges right when the button is hovered */
  arrow?: boolean;
};

type GlowLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

type GlowActionProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type GlowButtonProps = GlowLinkProps | GlowActionProps;

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 transition-transform duration-300 group-hover/glow:translate-x-1"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function GlowButton(props: GlowButtonProps) {
  if (props.href !== undefined) {
    const { className, children, arrow, ...rest } = props;
    return (
      <Link className={[BASE, className].filter(Boolean).join(" ")} {...rest}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }

  const { className, children, arrow, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={[BASE, "cursor-pointer", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}