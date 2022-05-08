import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  isAuth: false,
  otp: {
    phone: "",
    hash: "",
  },
  user: null,
  isUpdated: false,
  status: { type: STATUES.IDLE, message: null },
};

export const userAuthSlice = createSlice({
  name: "UserAuth",
  initialState,
  reducers: {
    sendOTP(state, action) {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },

    verifyOTP(state, action) {
      const { user } = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },

    actiavteUser(state, action) {
      const { userDto } = action.payload;
      state.user = userDto;
    },

    getUserDetais(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },

    updateUserProfile(state, action) {
      state.isUpdated = action.payload;
    },

    updateUserReset(state, action) {
      state.isUpdated = action.payload;
    },

    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },

    logoutUser(state, action) {
      state.isAuth = false;
      state.user = null;
    },

    clearAllErrors(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  sendOTP,
  setStatus,
  verifyOTP,
  actiavteUser,
  getUserDetais,
  logoutUser,
  clearAllErrors,
  updateUserProfile,
  updateUserReset,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;

// send Otp
export function send_otp(phone) {
  return async function sendOtpThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/send-otp", phone);
      dispatch(sendOTP(data));
      dispatch(
        setStatus({ type: STATUES.IDLE, message: "OTP send Successfully" })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// verify Otp
export function verify_otp(input) {
  return async function verifyOtpThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/verify-otp", input);
      dispatch(verifyOTP(data));
      dispatch(setStatus({ type: STATUES.IDLE, message: "OTP Verified" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// activate user
export function activate_user(formData) {
  return async function activateUserThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/activate-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(actiavteUser(data));
      dispatch(setStatus({ type: STATUES.IDLE, message: "User Activated" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// GET USEr
export function user_details() {
  return async function userDetailsThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/me");
      dispatch(getUserDetais(data.user));
      dispatch(setStatus({ type: STATUES.IDLE, message: "users" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// update USer
export function update_user(newUserData) {
  return async function updateUserThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/me/update-profile", newUserData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateUserProfile(data.success));
      dispatch(
        setStatus({ type: STATUES.IDLE, message: "User Update Successfully" })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

//update user reset
export function update_user_reset() {
  return async function updateUserResetThunk(dispatch, getState) {
    dispatch(updateUserReset(false));
  };
}

// log out
export function logout_user() {
  return async function logoutUserThunk(dispatch, getState) {
    try {
      const { data } = await api.get("/logout");
      dispatch(logoutUser());
      dispatch(setStatus({ type: STATUES.IDLE, message: "Logged Out" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// clear Users
export function clear_all_errors() {
  return async function clearErrorsThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.ERROR, message: null }));
  };
}
