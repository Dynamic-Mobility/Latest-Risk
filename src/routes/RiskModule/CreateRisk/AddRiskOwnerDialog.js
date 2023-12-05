import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Card, Chip, Typography } from "@mui/material";
import CreateRiskOwnerDialog from "./CreateRiskOwnerDialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { getAutoCompleteValue } from "../../../@dmt/Utils/commonHelper";
import { fetchAllRiskOwners } from "../../../Redux/features/RiskOwners";
import CloseIcon from "@mui/icons-material/Close";
import Divider from '@mui/material/Divider';


export default function AddRiskOwnerDialog({ riskDetails, setRiskDetails }) {
  const [open, setOpen] = React.useState(false);
  const { riskOwners } = useSelector(({ riskOwner }) => riskOwner);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ---------ONCHANGE EVENTS -----------//
  const handleOnCheck = (e, value) => {
    const { checked } = e.target;
    const data = [...riskDetails.riskOwners];
    const index = data.findIndex((val) => val.id === value.id);
    if (checked) {
      data.push({
        id: value.id,
        name: value.name,
      });
    } else {
      data.splice(index, 1);
    }
    setRiskDetails({ ...riskDetails, riskOwners: data }); //
  };

  const checkOwnerSelected = (options, value) => {
    const check = getAutoCompleteValue(options, value.id);
    if (check) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    dispatch(fetchAllRiskOwners());
  }, []);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Risk Owner
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        >
          <CloseIcon />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CreateRiskOwnerDialog
              riskDetails={riskDetails}
              setRiskDetails={setRiskDetails}
            />
            <hr style={{ marginTop: "10px" }} />
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {riskOwners?.map((owner, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Chip label={owner.riskOwnerTypeOwnerType} />
                  }
                  disablePadding
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkOwnerSelected(
                        riskDetails.riskOwners,
                        owner
                      )}
                      onChange={(e) => handleOnCheck(e, owner)}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": `checkbox-list-label-${index}`,
                      }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    id={`checkbox-list-label-${index}`}
                    primary={owner.name}
                    secondary={
                      <Typography sx={{display: 'grid'}} variant={"caption"}>
                        <span>
                          {owner?.organization?.map(
                            (org, index) => org.departmentName + " | "
                          )}
                        </span>
                        <span>
                          {owner?.organization?.map(
                            (org, index) => org.sectionName + " | "
                          )}
                        </span>
                        <span>
                          {owner?.organization?.map(
                            (org, index) => org.subSectionName + " | "
                          )}
                        </span>
                        <Divider />
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
