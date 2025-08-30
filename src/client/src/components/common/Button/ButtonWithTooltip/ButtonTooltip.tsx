import { Button } from "@/components/ui/button";
import { MyTooltip } from "@/components/common/MyTooltip";

function ButtonTooltip({
  tooltip,
  ...props
}: React.ComponentProps<typeof Button> & { tooltip: string }) {
  return (
    <MyTooltip content={tooltip}>
      <Button {...props} />
    </MyTooltip>
  );
}

export default ButtonTooltip;