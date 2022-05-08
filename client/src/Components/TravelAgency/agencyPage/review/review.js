import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
// import { useParams } from "react-router-dom";
import {
  add_review,
  reset_message,
} from "../../../../Slices/TravelAgenciesSlices/agencyProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { get_agency_profile_with_param } from "../../../../Slices/TravelAgenciesSlices/travelAuthSlice";

export default function AlertDialog({ agencyId }) {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  //   const { agencyId } = useParams();
  const dispatch = useDispatch();

  const { status, setMessage } = useSelector((state) => state.agencies);
  const { type, message } = status;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const reviewHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("agencyId", agencyId);

    dispatch(add_review(myForm));
    setOpen(false);
  };

  React.useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }

    if (setMessage !== null) {
      toast.success("Review Submited");
      dispatch(reset_message());
    }

    dispatch(get_agency_profile_with_param(agencyId));
  }, [dispatch, type, message, toast]);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: "red", border: "2px red solid" }}
      >
        Give Review
      </Button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"How was you experiance"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Rating
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={reviewHandler}>Submit Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
