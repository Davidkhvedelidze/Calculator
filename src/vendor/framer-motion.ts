import React, { forwardRef } from "react";

type MotionProps<T> = React.HTMLAttributes<T> & {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
};

function createMotionComponent<T extends keyof JSX.IntrinsicElements>(tag: T) {
  return forwardRef<HTMLElement, MotionProps<HTMLElement>>(function MotionComponent(props, ref) {
    const { children, ...rest } = props;
    const Component = tag as unknown as React.ElementType;
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  });
}

export const motion = {
  div: createMotionComponent("div"),
  section: createMotionComponent("section"),
  button: createMotionComponent("button"),
  header: createMotionComponent("header"),
};

export const m = motion;

export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export default motion;
