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
        },
        addHintInstruction:(state,action)=>{
            state.blockInstructionArray = action.payload
        }
    }
});
export const {addBlockInstruction,resetBlocklyInstruction,addHintInstruction} = blocklyInstructionSlice.actions;
export default blocklyInstructionSlice.reducer;