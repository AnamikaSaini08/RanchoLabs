let interval;

export const changeRobotPosition = (blocklyInstruction , obstaclePosition,row,col,setRobotPosition,robotDirectionRef)=>{
   let pos = {x:1 , y:1};
   let index = 1;

      interval = setInterval(()=>
      {
          if(index > blocklyInstruction.length){
          clearInterval(interval);
          return;
        }
        const direction = blocklyInstruction[index-1];
        console.log("Direction- ",direction);
        if(robotDirectionRef.current === "TOP")
        {
          if(direction === "BACKWARD"){
            if (pos.x > 1) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x - 1 && coord[1] === pos.y 
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, x: pos.x - 1 };
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "FORWARD"){
            console.log("Forward- ",pos.y);
            if (pos.x < row) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, x: pos.x + 1 };
               
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "LEFT"){
            console.log("left- ",pos.x);
            //setRobotDirection("LEFT");
            robotDirectionRef.current = "LEFT";
          }
          else if(direction === "RIGHT")
          { 
            console.log("right- ",pos.x);
            //setRobotDirection("RIGHT");
            robotDirectionRef.current = "RIGHT";
          }
        }
        else if(robotDirectionRef.current === "LEFT")
        {
          if(direction === "FORWARD"){
            if (pos.y > 1) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x && coord[1] === pos.y - 1
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, y: pos.y - 1 };
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "BACKWARD"){
            if (pos.y < col) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x && coord[1] === pos.y + 1
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, y: pos.y + 1 };
               
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "LEFT"){
            console.log("left- ",pos.x);
            //setRobotDirection("RIGHT");
            robotDirectionRef.current = "BOTTOM";
          }
          else if(direction === "RIGHT")
          { 
            console.log("right- ",pos.x);
            //setRobotDirection("LEFT");
            robotDirectionRef.current = "TOP";
          }
        }
        else if(robotDirectionRef.current === "RIGHT"){
          if(direction === "BACKWARD"){
            if (pos.y > 1) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x && coord[1] === pos.y - 1
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, y: pos.y - 1 };
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "FORWARD"){
            if (pos.y < col) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x && coord[1] === pos.y + 1
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, y: pos.y + 1 };
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "LEFT"){
            //setRobotDirection("BOTTOM");
            robotDirectionRef.current = "TOP";
          }
          else if(direction === "RIGHT")
          { 
            //setRobotDirection("TOP");
            robotDirectionRef.current = "BOTTOM";
          }
        }
        else if(robotDirectionRef.current === "BOTTOM")
        {
          if(direction === "BACKWARD"){
            if (pos.x < row) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, x: pos.x + 1 };
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "FORWARD"){
            if (pos.x > 1) {
              if (
                obstaclePosition &&
                obstaclePosition.some(
                  (coord) => coord[0] === pos.x - 1 && coord[1] === pos.y
                )
              ) {
                alert("Stuck", "You Fail! Robot got stuck on the way");
                clearInterval(interval);
              } else {
                pos = { ...pos, x: pos.x - 1 };
               
              }
            } else {
              alert("Stuck", "You Fail! Robot got stuck on the way");
              clearInterval(interval);
              return;
            }
          }
          else if(direction === "LEFT"){
            console.log("left- ",pos.x);
            //setRobotDirection("TOP");
            robotDirectionRef.current = "LEFT";
          }
          else if(direction === "RIGHT")
          { 
            console.log("right- ",pos.x);
           // setRobotDirection("BOTTOM");
           robotDirectionRef.current = "RIGHT";
          }
        }
        index++;
        //robotPositionRef.current = { ...robotPositionRef.current, ...pos };
        setRobotPosition({...pos}); 
      },3000);
  }
