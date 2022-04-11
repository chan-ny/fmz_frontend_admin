 import Swal from "sweetalert2";

function showMessage(even,text,timeout) {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: timeout,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: even,
        title: '<div style=" font-weight: normal;">'+text+'</div>'
      });
}

export default{
    showMessage
}