import { map, filter } from "lodash";
import { Density } from "../../../types/Density";
import { Grid } from "../../Grid/Grid";
import { elementList } from "../../../lib/elementList";
import { Dialog } from "../../common/Dialog/Dialog";

type GroupDialogProps = {
  open: boolean;
  onClose: () => void;
  group: Density;
};

const smallSize = 35;

export const GroupDialog = ({ open, onClose, group }: GroupDialogProps) => {
  const options = filter(
    elementList,
    ({ colorDensity }) => colorDensity === group.result
  );

  return (
    <Dialog title={`Skupina ${group.result}`} open={open} onClose={onClose}>
      <Grid
        grid={[map(options, (option) => option.name)]}
        displayName
        size={smallSize}
        sx={{
          justifyContent: "flex-start",
          gap: "10px",
          marginTop: "10px",
        }}
      />
    </Dialog>
  );
};
