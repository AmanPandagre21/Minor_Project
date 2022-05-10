import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  travelagencies: [],
  agenciesDetails: null,
  isUpdated: false,
  setMessage: null,
  reviews: [],
  status: { type: STATUES.IDLE, message: null },
};

export const agencyProfileSlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    updatePassword(state, action) {
      state.isUpdated = true;
    },

    updateReset(state, action) {
      state.isUpdated = action.payload;
    },

    updateAgencyProfile(state, action) {
      state.isUpdated = true;
    },

    getALlAgencies(state, action) {
      state.travelagencies = action.payload;
    },

    addNewReview(state, action) {
      state.setMessage = action.payload;
    },

    getAllReviews(state, action) {
      state.reviews = action.payload;
    },

    addCar(state, action) {
      state.setMessage = action.payload;
      state.isUpdated = true;
    },

    deleteCar(state, action) {
      state.setMessage = action.payload;
      state.isUpdated = true;
    },

    resetMessage(state, action) {
      state.setMessage = action.payload;
    },

    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },
  },
});

export const {
  getALlAgencies,
  updatePassword,
  updateReset,
  updateAgencyProfile,
  addNewReview,
  getAllReviews,
  resetMessage,
  addCar,
  deleteCar,
  setStatus,
} = agencyProfileSlice.actions;

export default agencyProfileSlice.reducer;

// get all agencies
export function get_all_agencies_profile(keyword = "", ratings = 0) {
  return async function getAllAgenciesProfileThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get(`/agency/travel_agencies`);
      dispatch(getALlAgencies(data.agencyDetails));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Agency Profiles" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function agency_password_update(formData) {
  return async function agencyPasswordUpdateThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { oldPassword, newPassword, confirmPassword } = formData;
      const { data } = await api.put("/agency/change-password", {
        oldPassword: oldPassword,
        password: newPassword,
        confirmpassword: confirmPassword,
      });
      dispatch(updatePassword(data.success));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "Password changed Successfull",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// update driver
export function update_agency_profile(newAgencyData) {
  return async function updateAgencyThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/agency/profile/update", newAgencyData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateAgencyProfile(data.success));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "Agency Update Successfully",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function add_agency_car(carData) {
  return async function addAgencyCarThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/agency/add-car", carData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addCar(data.message));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "car Added Successfully",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function delete_agency_car(id) {
  return async function deleteAgencyCarThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.delete(`/agency/cars-and-drivers/${id}`);
      dispatch(deleteCar(data.message));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "car deleted Successfully",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function add_review(reviewData) {
  return async function addReviewThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/agency/review", reviewData);
      dispatch(addNewReview(data.message));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "Review Added Successfully",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function get_all_reviews(id) {
  return async function getAllReviewsThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/agency/reviews");
      dispatch(getAllReviews(data.reviews));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "Reviews",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

//update user reset
export function update_reset() {
  return async function updateResetThunk(dispatch, getState) {
    dispatch(updateReset(false));
  };
}

export function reset_message() {
  return async function resetMessageThunk(dispatch, getState) {
    dispatch(resetMessage(null));
  };
}
