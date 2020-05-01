import { toast, ToastId } from 'react-toastify';

let addedProductToast: ToastId;
let removedProductToast: ToastId;

export const emitAddedProductToast = () => {
  const toastId = emitSuccessToast('Product added successfully.', addedProductToast);
  addedProductToast = toastId;
};

export const emitRemovedProductToast = () => {
  const toastId = emitSuccessToast('Product removed successfully.', removedProductToast);
  removedProductToast = toastId;
};

export const emitCheckoutCompletedToast = () => {
  toast.success('Checkout was successfully completed!');
};

const emitSuccessToast = (message: string, previousToast: ToastId) => {
  return !toast.isActive(previousToast) ? toast.success(message) : previousToast;
};
