import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  isUpdated: false,
  drivers: [],
  status: { type: STATUES.IDLE, message: null },
};

export const driverProfileSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    updatePassword(state, action) {
      state.isUpdated = true;
    },

    updateReset(state, action) {
      state.isUpdated = action.payload;
    },

    updateDriverProfile(state, action) {
      state.isUpdated = true;
    },

    getALlDrivers(state, action) {
      state.drivers = action.payload;
    },

    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },
  },
});

export const {
  updatePassword,
  updateDriverProfile,
  setStatus,
  updateReset,
  getALlDrivers,
} = driverProfileSlice.actions;

export default driverProfileSlice.reducer;

// get User Details

export function driver_password_update(formData) {
  return async function driverPasswordUpdateThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { oldPassword, newPassword, confirmPassword } = formData;
      const { data } = await api.put(
        "/driver/change-password",
        {
          oldPassword: oldPassword,
          password: newPassword,
          confirmpassword: confirmPassword,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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
export function update_driver_profile(newDriverData) {
  return async function updateDriverThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/driver/me/update-me", newDriverData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateDriverProfile(data.success));
      dispatch(
        setStatus({ type: STATUES.IDLE, message: "Driver Update Successfully" })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// get all drivers
export function get_all_drivers_profile() {
  return async function getAllDriversProfileThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/driver/drivers");
      dispatch(getALlDrivers(data.drivers));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Drivers Profiles" }));
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
