import Swal from "sweetalert2";

export function showHintFunction(setShowHint)
{
  Swal.fire({
    title: 'Are You Tired?',
    text: "Do You Want To See Solution?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, See!'
  }).then((result) => {
    if (result.isConfirmed) {
      setShowHint(true);
    }
  })
}

export function handleGameResult(status, message, icon , result , hint,setIsNextLevel) {
    if(hint){
      Swal.fire({
        title: status,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: result,
        cancelButtonColor: '#d33',
      });
    }else{
      Swal.fire({
        icon: icon,
        title: status,
        text: message,
        confirmButtonText: result,
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsNextLevel(true);
        }
      });
    }
  }

  export function resetAlert(setResetFlag) {
      Swal.fire({
        title: "Reset Task?",
        text: "You will lose the current code.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Reset!",
        cancelButtonColor: 'red',
      }).then((result)=>{
        if(result.isConfirmed){
          setResetFlag(true);
          Swal.fire({
            title: "Reset",
            text: "Your code is reset.",
            icon: "success",
            confirmButtonText: "OK",
          })
        }
      });
  }