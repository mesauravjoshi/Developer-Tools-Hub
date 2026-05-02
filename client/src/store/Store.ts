import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "@/store/Slice/SliderSlice";
import tabReducer from "@/store/Slice/tabSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    tabs: tabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;