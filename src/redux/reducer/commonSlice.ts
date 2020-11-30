import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IContactInfo} from "../../share/interfaces/IContactInfo";


export interface ICommonSliceState {
    contact : IContactInfo | null,
    isFeatching : boolean,
    isDone : boolean
}

const initialState: ICommonSliceState = {
    contact: null,
    isFeatching: false,
    isDone: false
}

const commonSlice = createSlice({
    name: 'CommonSlice',
    initialState,
    reducers: {

        sendingContactInfo(state, action:PayloadAction<ICommonSliceState>){
            state = action.payload
        }


    }
});

export const {} = commonSlice.actions;

export default commonSlice.reducer;
