import { createSlice } from "@reduxjs/toolkit";

const matrixConfigSlice = createSlice({
  name: "matrixConfig",
  initialState: {
    gameConfigOne: {
      row: 10,
      col: 10,
      robotStartPosition: { x: 4, y: 2 },
      robotEndPosition: { x: 10, y: 10 },
      obstaclePosition: [
        [4, 7],
        [7, 7],
        [2,2],
        [5,3]
      ],
      batteryPosition: [
        [3,2],
        [4,4],
        [4,3]
      ],
      initialDirectionRobot: "TOP",
      hintArray: ["LEFT","FORWARD"]
    },
    gameConfigTwo: {
      row: 10,
      col: 10,
      robotStartPosition: { x: 1, y: 1 },
      robotEndPosition: { x: 10, y: 10 },
      obstaclePosition: [
        [2, 3],
        [7, 7]
      ],
      batteryPosition: [
        [4, 4],
        [9, 9]
      ],
      initialDirectionRobot: "Forward",
      hintArray: ["Move LEFT\n","Move FORWARD\n"]
    },
    gameConfigThree: {
      row: 10,
      col: 10,
      robotStartPosition: { x: 4, y: 4 },
      robotEndPosition: { x: 10, y: 10 },
      obstaclePosition: [
        [2, 3],
        [7, 7]
      ],
      batteryPosition: [
        [4, 4],
        [9, 9]
      ],
      initialDirectionRobot: "Forward",
      hintArray: ["LEFT","FORWARD"]
    },
    gameConfigFour: {
      row: 10,
      col: 10,
      robotStartPosition: { x: 1, y: 1 },
      robotEndPosition: { x: 10, y: 10 },
      obstaclePosition: [
        [2, 3],
        [7, 7]
      ],
      batteryPosition: [
        [4, 4],
        [9, 9]
      ]
    },
    gameConfigFive: {
      row: 10,
      col: 10,
      robotStartPosition: { x: 1, y: 1 },
      robotEndPosition: { x: 10, y: 10 },
      obstaclePosition: [
        [2, 3],
        [7, 7]
      ],
      batteryPosition: [
        [4, 4],
        [9, 9]
      ]
    }
  }
});
export default matrixConfigSlice.reducer;
