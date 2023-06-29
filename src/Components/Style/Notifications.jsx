import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_LEFT
    })
};

const showToastSuccessLogin = () => {
    toast.success('Sign in ok!', {
        position: toast.POSITION.TOP_LEFT
    })
};

const showToastError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_LEFT
    });
};

const showToastErrorLogin = () => {
    toast.error('Identifiants invalides !', {
        position: toast.POSITION.TOP_LEFT
    });
};

// const showToastWarning = () => {
//     toast.warning('Warning Notification !', {
//         position: toast.POSITION.TOP_LEFT
//     });
// };

// const showToastInformation = () => {
//     toast.info('Information Notification !', {
//         position: toast.POSITION.BOTTOM_CENTER
//     });
// };
// const showToastDefault = () => {
//     toast('Default Notification !', {
//         position: toast.POSITION.BOTTOM_LEFT
//     });
// };

// const showToastCustom = () => {
//     toast('Custom Style Notification with css class!', {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         className: 'foo-bar'
//     });;
// };

const Notify = () => {

    return (
        <>
            <ToastContainer />
        </>
    );
};

export default Notify;
export { showToastSuccessLogin, showToastErrorLogin, showToastSuccess, showToastError };