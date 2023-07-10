import { createSlice } from "@reduxjs/toolkit";

const blocklyInstructionSlice = createSlice({
    name: 'blocklyInstruction',
    initialState: {
        blockInstructionArray : []
    },
    reducers: {
        addBlockInstruction : (state,action)=>{
            state.blockInstructionArray = action.payload;
        },
        resetBlocklyInstruction : (state,action)=>{
            state.blockInstructionArray = [];
        }
    }
});
export const {addBlockInstruction,resetBlocklyInstruction} = blocklyInstructionSlice.actions;
export default blocklyInstructionSlice.reducer;