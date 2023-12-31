import { createSlice } from "@reduxjs/toolkit";

const matrixConfigSlice = createSlice({
  name: "matrixConfig",
  initialState: {
    gameConfigOne: {
      row: 10,
      col: 10,
      robotStartPosition: { x: 4, y: 4 },
      robotEndPosition: { x: 10, y: 10 },
      obstaclePosition: [
        [4, 7],
        [7, 7]
      ],
      batteryPosition: [
        [4, 3],
        [9, 9]
      ],
      initialDirectionRobot: "TOP"
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
      initialDirectionRobot: "Forward"
    },
    gameConfigThree: {
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
