import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, AppDispatch} from '../data/store';
import {IFarm} from "../../share/interfaces/IFarm";


export interface FarmSliceState {
    current: number,
    farms: IFarm[]
}

const initialState: FarmSliceState = {
    current: 0,
    farms: []
}

const farmSlice = createSlice({
    name: 'farms',
    initialState,
    reducers: {
        addFarm(state, action: PayloadAction<IFarm>) {
            state.farms.push(action.payload);
        },
        editFarm(state, action: PayloadAction<IFarm>) {
            let editFarm = state.farms.find(item => item.id === action.payload.id);
            if (editFarm) {
                editFarm.address = action.payload.address;
                editFarm.name = action.payload.name;
            }
        },
        removeFarm(state, action: PayloadAction<IFarm>) {
            state.farms = state.farms.filter(item => item.id !== action.payload.id);
        },
        initFarms(state, action: PayloadAction<IFarm[]>){
            state.farms = action.payload;
        }
    }
});

export const {editFarm, removeFarm , initFarms} = farmSlice.actions;


export const addFarm = (
    id: number, name: string, address: string
): AppThunk => async (dispatch: AppDispatch) => {
    const newFarm: IFarm = {
        id: id,
        name: name,
        address: address
    };

    dispatch(farmSlice.actions.addFarm(newFarm));
}

export default farmSlice.reducer;
