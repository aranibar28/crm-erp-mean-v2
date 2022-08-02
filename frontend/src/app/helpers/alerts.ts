import Swal from 'sweetalert2';

export const success_alert = (text: string) => {
  Swal.fire('Listo!', text, 'success');
};

export const error_alert = (text: string) => {
  Swal.fire('Error', text, 'error');
};
