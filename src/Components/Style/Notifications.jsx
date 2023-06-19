import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastSuccess = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    })
};

const showToastSuccessLogin = () => {
    toast.success('Sign in ok!', {
        position: toast.POSITION.TOP_RIGHT
    })
};

const showToastError = () => {
    toast.error('Error Notification !', {
        position: toast.POSITION.TOP_CENTER
    });
};

const showToastErrorLogin = () => {
    toast.error('Identifiants invalides !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const showToastWarning = () => {
    toast.warning('Warning Notification !', {
        position: toast.POSITION.TOP_LEFT
    });
};

const showToastInformation = () => {
    toast.info('Information Notification !', {
        position: toast.POSITION.BOTTOM_CENTER
    });
};
const showToastDefault = () => {
    toast('Default Notification !', {
        position: toast.POSITION.BOTTOM_LEFT
    });
};

const showToastCustom = () => {
    toast('Custom Style Notification with css class!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar'
    });;
};

const Notify = () => {

    return (
        <>
            <ToastContainer />
        </>
    );
};

export default Notify;
export { showToastSuccessLogin, showToastErrorLogin }