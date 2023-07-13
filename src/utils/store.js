import { configureStore } from "@reduxjs/toolkit";
import blocklyInstructionSlice from './blocklyInstructionSlice';
import matrixConfigSlice from "./matrixConfigSlice";
import gameLevelSlice from "./gameLevelSlice";

const store = configureStore(
    {
        reducer:{
            blocklyInstruction : blocklyInstructionSlice,
            matrixConfig : matrixConfigSlice,
            gameLevel : gameLevelSlice
        }
    }
);
export default store;