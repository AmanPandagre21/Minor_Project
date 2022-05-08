import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  isAgencyAuth: false,
  agency: null,
  //   isUpdated: false,
  status: { type: STATUES.IDLE, message: null },
};

export const agencyAuthSlice = createSlice({
  name: "agencyAuth",
  initialState,
  reducers: {
    agencyLogin(state, action) {
      state.isAgencyAuth = true;
      state.agency = action.payload;
    },

    agencyRegistration(state, action) {
      state.isAgencyAuth = true;
      state.agency = action.payload;
    },

    agencyActivation(state, action) {
      state.agency = action.payload;
    },

    getAgencyProfile(state, action) {
      state.isAgencyAuth = true;
      state.agency = action.payload;
    },

    getAgencyProfileWithParam(state, action) {
      // state.isAgencyAuth = true;
      state.agency = action.payload;
    },

    agencyLogout(state, action) {
      state.isAgencyAuth = false;
      state.agency = null;
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
  agencyLogin,
  agencyActivation,
  agencyRegistration,
  setStatus,
  agencyLogout,
  getAgencyProfile,
  forgotPassword,
  resetPassword,
  getAgencyProfileWithParam,
  forgotPasswordReset,
  clearAllErrors,
} = agencyAuthSlice.actions;

export default agencyAuthSlice.reducer;

// agency Login

export function agency_login(email, password) {
  return async function agencyLoginThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/agency/login", { email, password });
      dispatch(agencyLogin(data.agency));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Login Successfull" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

// Registration Agency

export function agency_registration(formData) {
  return async function agencyRegistrationThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.post("/agency/registration", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(agencyRegistration(data.angencyInfo));
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

//activate Agency

export function agency_activation(activationData) {
  return async function agencyActivationThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { state, city, address, pincode } = activationData;
      const { data } = await api.put("/agency/activate-agency", {
        state,
        city,
        address,
        pincode,
      });
      dispatch(agencyRegistration(data.agency));
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

export function logout_agency() {
  return async function agencyLogoutThunk(dispatch, getState) {
    try {
      const { data } = await api.get("/agency/logout");
      dispatch(agencyLogout());
      dispatch(setStatus({ type: STATUES.IDLE, message: "Logged Out" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function get_agency_profile() {
  return async function getAgencyProfileThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/agency/profile");
      dispatch(getAgencyProfile(data.agencyDetails));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Agency" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function get_agency_profile_with_param(id) {
  return async function getAgencyProfileWithParamThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get(`/agency/profile/${id}`);
      dispatch(getAgencyProfileWithParam(data.agencyDetails));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Agency" }));
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
      const { data } = await api.post("/agency/forgot-password", {
        email: email,
      });
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
      const { data } = await api.put(`/agency/password/reset/${token}`, {
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
