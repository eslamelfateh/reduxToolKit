import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import reservationSlice from "./reservationSlice";

export const store = configureStore({
  reducer: {
		reservations : reservationSlice,
		customers: customerSlice
	},
});
