import React from "react";

const DeleteButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            Delete
        </button>
    );
};

const EditButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            Edit
        </button>
    );
};

const ShowButton = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            Show
        </button>
    );
};




export default { DeleteButton, EditButton, ShowButton }