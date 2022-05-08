import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  isDriverAuth: false,
  driver: null,
  setMessage: null,
  status: { type: STATUES.IDLE, message: null },
};

export const driverAuthSlice = createSlice({
  name: "driverAuth",
  initialState,
  reducers: {
    driverLogin(state, action) {
      state.isDriverAuth = true;
      state.driver = action.payload;
    },

    driverRegistration(state, action) {
      state.isDriverAuth = true;
      state.driver = action.payload;
    },

    getDriverProfile(state, action) {
      state.isDriverAuth = true;
      state.driver = action.payload;
    },

    driverLogout(state, action) {
      state.isDriverAuth = false;
      state.driver = null;
    },

    forgotPassword(state, action) {
      state.setMessage = action.payload;
    },

    resetPassword(state, action) {
      state.setMessage = action.payload;
    },

    forgotPasswordReset(state, action) {
      state.setMessage = action.payload;
    },

    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },

    clearAllErrors(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  driverLogout,
  driverRegistration,
  driverLogin,
  getDriverProfile,
  forgotPassword,
  setStatus,
  clearAllErrors,
  forgotPasswordReset,
  resetPassword,
} = driverAuthSlice.actions;

export default driverAuthSlice.reducer;

// Driver Login

export function driver_login(email, password) {
  return async function driverLoginThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/driver/login", { email, password });
      dispatch(driverLogin(data.driver));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Login Successfull" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// Registration Driver

export function driver_registration(formData) {
  return async function driverRegistrationThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/driver/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(driverRegistration(data.driverData));
      dispatch(
        setStatus({ type: STATUES.IDLE, message: "Registration Successfull" })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// log out

export function logout_driver() {
  return async function driverLogoutThunk(dispatch, getState) {
    try {
      const { data } = await api.get("/driver/logout");
      dispatch(driverLogout());
      dispatch(setStatus({ type: STATUES.IDLE, message: "Logged Out" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function get_driver_profile() {
  return async function getDriverProfileThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/driver/profile");
      dispatch(getDriverProfile(data.driverDetails));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Driver Details" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function forgot_password(email) {
  return async function forgotPasswordThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/driver/forgot-password", {
        email: email,
      });
      console.log(data);
      dispatch(forgotPassword(data.message));
      dispatch(setStatus({ type: STATUES.IDLE, message: data.message }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function reset_password(token, password, confirmpassword) {
  return async function resetPasswordThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put(`/driver/password/reset/${token}`, {
        password,
        confirmpassword,
      });
      dispatch(resetPassword(data.message));
      dispatch(setStatus({ type: STATUES.IDLE, message: data.message }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

//update user reset
export function forgot_password_reset() {
  return async function forgotPasswordResetThunk(dispatch, getState) {
    dispatch(forgotPasswordReset(null));
  };
}

// clear Users
export function clear_all_errors() {
  return async function clearErrorsThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.ERROR, message: null }));
  };
}
