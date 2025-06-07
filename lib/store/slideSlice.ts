import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {presentationAPI} from "../api/axios/presentation-api";
import {zodSlide} from "../zod/zodSlide";

export const fetchSlides = createAsyncThunk(
    'slides/fetchSlides',
    async (slideId: string, thunkAPI) => {
        try {
            const response = await presentationAPI.getPresentationSlide(slideId);
            return response.rows
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState: SlideSliceState = {
    slides: [],
    isLoading: false,
    error: null,
}

export const slideSlice = createSlice({
    name: "slide",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSlides.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSlides.fulfilled, (state, action) => {
                state.slides = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchSlides.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
    selectors: {
        selectSlide: (state) => state.slides,
        selectLoading: (state) => state.isLoading,
        selectError: (state) => state.error,
    }
})

export const {selectSlide, selectLoading, selectError} = slideSlice.selectors;


//types
export type SlideSliceState = {
    slides: zodSlide[];
    isLoading: boolean;
    error: string | null;
}