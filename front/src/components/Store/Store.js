import { configureStore } from '@reduxjs/toolkit'
import sliderReducer from './Slice/SliderSlice'

export const store = configureStore({
    reducer: {
        slider: sliderReducer,
    }
})

