import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./Slices/UsersSlices/authSlice";
import agencyAuthReducer from "./Slices/TravelAgenciesSlices/travelAuthSlice";
import agencyProfileReducer from "./Slices/TravelAgenciesSlices/agencyProfileSlice";
import driverAuthReducer from "./Slices/DriverSlices/driverAuthSlice";
import driverProfileReducer from "./Slices/DriverSlices/driverProfileSlice";
import attacherAuthReducer from "./Slices/CarAttacherSlices/attacherAuthSlice";
import attacherProfileReducer from "./Slices/CarAttacherSlices/attacherProfileSlice";

export const store = configureStore({
  reducer: {
    users: userAuthReducer,
    agencyAuth: agencyAuthReducer,
    agencies: agencyProfileReducer,
    driverAuth: driverAuthReducer,
    drivers: driverProfileReducer,
    attacherAuth: attacherAuthReducer,
    attachers: attacherProfileReducer,
  },
});
