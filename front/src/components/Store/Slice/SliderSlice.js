import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isSliderOpen: false
}

const sliderSlice = createSlice({
    name : 'slider',
    initialState,
    reducer: {
        setIsSliderOpen:(state,action) => {
            state.isSliderOpen = action.paload
        }
    }
});

export const {setIsSliderOpen} = sliderSlice.actions;
export default sliderSlice.reducer;