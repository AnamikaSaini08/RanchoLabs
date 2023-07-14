import React,{useEffect,useState} from "react";
import ThreeDMatrix from "./ThreeDMatrix";
import { useDispatch } from "react-redux";
import { resetBlocklyInstruction } from "../utils/blocklyInstructionSlice";
import './hintComponentCss.css';
import Shimmer from "./Shimmer";

const HintComponent = ({
  row,
  col,
  batteryPosition,
  obstaclePosition,
  robotStartPosition,
  robotEndPosition,
  hintArray,
  resetFlag,
  setResetFlag,
  showHint,
  setShowHint,
  hintNextButton
}) => {
  const dispatch = useDispatch();
  const [hintIndex , setHintIndex] = useState(0);
  useEffect(()=>{
    const interval = setInterval(()=>{
        setHintIndex(hintIndex+1);
    },3000)

    return ()=>{
        clearInterval(interval);
    }
  },[hintIndex]);
  return (!obstaclePosition && !batteryPosition && !row && !col) ? <Shimmer/> : (
    <div className="h-screen w-screen flex">
      <div className="w-3/4">
        <ThreeDMatrix
          row={row}
          col={col}
          batteryPosition={batteryPosition}
          obstaclePosition={obstaclePosition}
          robotStartPosition={robotStartPosition}
          robotEndPosition={robotStartPosition}
          hintArray={hintArray}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
          showHint={showHint}
          setShowHint={setShowHint}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-between hintContainer">
      <ol className="mx-auto my-auto w-full text-center" type="1">
          {hintArray.map((hint, ind) => (
            <li key={ind} className={`text-white text-lg text-bold my-1 w-full ${hintIndex===ind && 'bg-blue-600'} `}>
              Move {hint}
            </li>
          ))}
        </ol>
        <div className="flex text-white flex-col justify-end w-full">
          <button
            className="bg-green-600 px-3 py-3 rounded-sm  my-1"
            onClick={() => {
              setShowHint(false);
              dispatch(resetBlocklyInstruction());
            }}
          >
            Try on Own!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintComponent;
