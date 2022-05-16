import { createSlice } from "@reduxjs/toolkit";
import api from "../../http/serverApi";

export const STATUES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  carAttachers: [],
  isUpdated: false,
  setMessage: null,
  status: { type: STATUES.IDLE, message: null },
};

export const attacherProfileSlice = createSlice({
  name: "carAttacher",
  initialState,
  reducers: {
    getALlattachers(state, action) {
      state.carAttachers = action.payload;
    },

    updatePassword(state, action) {
      state.isUpdated = true;
    },

    updateReset(state, action) {
      state.isUpdated = action.payload;
      state.setMessage = null;
    },

    updateAttacherProfile(state, action) {
      state.isUpdated = true;
    },

    addCar(state, action) {
      state.setMessage = action.payload;
      state.isUpdated = true;
    },

    deleteCar(state, action) {
      state.setMessage = action.payload;
      state.isUpdated = true;
    },

    updateCar(state, action) {
      state.setMessage = action.payload;
      state.isUpdated = true;
    },

    setStatus(state, action) {
      state.status.type = action.payload.type;
      state.status.message = action.payload.message;
    },
  },
});

export const {
  getALlAttachers,
  updatePassword,
  updateReset,
  updateAttacherProfile,
  addCar,
  updateCar,
  deleteCar,
  setStatus,
} = attacherProfileSlice.actions;

export default attacherProfileSlice.reducer;

// get all attachers
export function get_all_attachers_profile() {
  return async function getAllAttachersProfileThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.get("/car/car-attachers");
      dispatch(getALlAttachers(data.attachers));
      dispatch(setStatus({ type: STATUES.IDLE, message: "Attacher Profiles" }));
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function attacher_password_update(formData) {
  return async function attacherPasswordUpdateThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { oldPassword, newPassword, confirmPassword } = formData;
      const { data } = await api.put("/car/change-password", {
        oldpassword: oldPassword,
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
export function update_attacher_profile(newAttacherData) {
  return async function updateAttacherThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put(
        "/car/me/update-profile",
        newAttacherData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(updateAttacherProfile(data.success));
      dispatch(
        setStatus({
          type: STATUES.IDLE,
          message: "Attacher Update Successfully",
        })
      );
    } catch (error) {
      dispatch(
        setStatus({ type: STATUES.ERROR, message: error.response.data.message })
      );
    }
  };
}

export function add_attacher_car(formData) {
  return async function addAttacherCarThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.put("/car/cars/add", formData, {
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

export function delete_attacher_car(id) {
  return async function deleteAttacherCarThunk(dispatch, getState) {
    dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
    try {
      const { data } = await api.delete(`/car/cars/${id}`);
      dispatch(deleteCar(data.message));
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

// export function update_attacher_car(carData) {
//   return async function updateAttacherCarThunk(dispatch, getState) {
//     dispatch(setStatus({ type: STATUES.LOADING, message: "Loading" }));
//     try {
//       const { data } = await api.put("/car/cars/a", carData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       dispatch(addCar(data.message));
//       dispatch(
//         setStatus({
//           type: STATUES.IDLE,
//           message: "car Added Successfully",
//         })
//       );
//     } catch (error) {
//       dispatch(
//         setStatus({ type: STATUES.ERROR, message: error.response.data.message })
//       );
//     }
//   };
// }

//update user reset
export function update_reset() {
  return async function updateResetThunk(dispatch, getState) {
    dispatch(updateReset(false));
  };
}
