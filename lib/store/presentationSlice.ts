import {zodPresentation} from "../zod/zodPresentation";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {presentationAPI} from "../api/axios/presentation-api";


export const fetchPresentation = createAsyncThunk(
    'presentation/fetchPresentation',
    async (_, thunkAPI) => {
        try {
            const response = await presentationAPI.getPresentations()
            return response
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
const initialState: PresentationSliceState = {
    presentations: [],
    isLoading: false,
    error: null,
}

export const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPresentation.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPresentation.fulfilled, (state, action) => {
                state.presentations = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchPresentation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
    selectors: {
        selectPresentations: (presentations) => presentations.presentations,
        selectLoading: (presentation) => presentation.isLoading,
        selectError: (presentation) => presentation.error,
    }
})

export const {selectPresentations, selectLoading, selectError} = presentationSlice.selectors;


//types

export type PresentationSliceState = {
    presentations: zodPresentation[];
    isLoading: boolean;
    error: string | null;
}