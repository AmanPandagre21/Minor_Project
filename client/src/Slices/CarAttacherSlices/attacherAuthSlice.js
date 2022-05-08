import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  isAttacherAuth: false,
  attacher: null,
  setMessage: null,
  status: { type: STATUES.IDLE, message: null },
};

export const attacherAuthSlice = createSlice({
  name: "attacherAuth",
  initialState,
  reducers: {
    attacherLogin(state, action) {
      state.isAttacherAuth = true;
      state.attacher = action.payload;
    },

    attacherRegistration(state, action) {
      state.isAttacherAuth = true;
      state.attacher = action.payload;
    },

    attacherActivation(state, action) {
      state.attacher = action.payload;
    },

    getAttacherProfile(state, action) {
      state.isAttacherAuth = true;
      state.attacher = action.payload;
    },

    attacherLogout(state, action) {
      state.isAttacherAuth = false;
      state.attacher = null;
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
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },
  },
});

export const {
  attacherLogin,
  attacherActivation,
  attacherRegistration,
  setStatus,
  attacherLogout,
  getAttacherProfile,
  forgotPassword,
  resetPassword,
  forgotPasswordReset,
  clearAllErrors,
} = attacherAuthSlice.actions;

export default attacherAuthSlice.reducer;

// attacher Login

export function attacher_login(email, password) {
  return async function attacherLoginThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/car/login", { email, password });
      dispatch(attacherLogin(data.carAttacher));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Login Successfull" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// Registration attacher

export function attacher_registration(formData) {
  return async function attacherRegistrationThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/car/registration", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(attacherRegistration(data.carAttacherData));
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

//activate Attacher

export function attacher_activation(formData) {
  return async function attacherActivationThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/car/activate-attacher", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(attacherActivation(data.carAttacher));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "Profile Activated Successfull",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// log out

export function logout_attacher() {
  return async function attacherLogoutThunk(dispatch, getState) {
    try {
      const { data } = await api.get("/car/logout");
      dispatch(attacherLogout());
      dispatch(setStatus({ type: STATUES.IDLE, message: "Logged Out" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function get_attacher_profile() {
  return async function getAttacherProfileThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/car/profile");
      dispatch(getAttacherProfile(data.attacherDetails));
      dispatch(setStatus({ type: STATUES.IDLE, message: "attacher" }));
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
      const { data } = await api.post("/car/forgot-password", {
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
      const { data } = await api.put(`/car/password/reset/${token}`, {
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
