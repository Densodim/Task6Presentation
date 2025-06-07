import axios from "axios";
import {zodPresentationResponse} from "../../zod/zodPresentation";
import {zodSlide} from "../../zod/zodSlide";


const setting = {
    withCredentials: true,
    headers: {}
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC__URL,
    ...setting,
})

//api

export const presentationAPI = {
    getPresentations() {
        const promise = instance.get<zodPresentationResponse>("api/presentations")
        return promise
            .then(res => res.data)
            .then(presentations => presentations.presentation)
    },
    getPresentationSlide(presentationId: string | undefined):Promise<SlideAPIResponse> {
        const promise = instance.get<SlideAPIResponse>(`/api/presentations/${presentationId}/slides`);
        return promise.then(res => res.data)
    }
}

//type
type SlideAPIResponse = {
    rows: zodSlide[];
};