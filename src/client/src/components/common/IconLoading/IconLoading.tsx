import { cx } from "class-variance-authority";
import "./style.css";

interface IconLoadingProps extends React.ComponentProps<"div"> {
  className?: string;
}

export default function IconLoading({ className, ...props }: IconLoadingProps) {
  return <div className={cx("spinner", className)} {...props}></div>;
}
