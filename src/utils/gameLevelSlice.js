import { createSlice } from "@reduxjs/toolkit";

const gameLevelSlice = createSlice({
    name: 'gameLevel',
    initialState: {
        gameLevel: 1,
    },
    reducers:{
        increaseGameLevel: (state,action)=>{
            state.gameLevel = state.gameLevel + 1;
        }
    }
});

export const {increaseGameLevel} = gameLevelSlice.actions;
export default gameLevelSlice.reducer;
