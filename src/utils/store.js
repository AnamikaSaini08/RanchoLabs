import { configureStore } from "@reduxjs/toolkit";
import blocklyInstructionSlice from './blocklyInstructionSlice';
import matrixConfigSlice from "./matrixConfigSlice";

const store = configureStore(
    {
        reducer:{
            blocklyInstruction : blocklyInstructionSlice,
            matrixConfig : matrixConfigSlice,
        }
    }
);
export default store;