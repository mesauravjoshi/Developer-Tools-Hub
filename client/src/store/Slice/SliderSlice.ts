import { createSlice, } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

type SliderState = {
    isSliderOpen: boolean;
};

const initialState: SliderState = {
    isSliderOpen: false,
};

const sliderSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {
        setIsSliderOpen: (state, action: PayloadAction<boolean>) => {
            state.isSliderOpen = action.payload;
        },
    },
});

export const { setIsSliderOpen } = sliderSlice.actions;
export default sliderSlice.reducer;