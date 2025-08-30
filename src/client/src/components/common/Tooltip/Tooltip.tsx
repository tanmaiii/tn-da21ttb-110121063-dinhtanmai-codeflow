import { Button } from "@/components/ui/button";
import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

function Tooltip({
  tooltip,
  children,
}: React.ComponentProps<typeof Button> & { tooltip: string }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p
            className="dark:text-gray-700 text-gray-200 shadow-xs 
                      dark:bg-white bg-zinc-900 border-b 
                        text-sm py-1 px-2 rounded-md"
          >
            {tooltip}
          </p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}

export default Tooltip;
