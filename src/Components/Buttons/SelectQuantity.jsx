import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


export default function QuantityChecker({ min, max }) {
    const [value, setValue] = useState(0);

    const [hover, setHover] = useState(false);
    const [disabledDec, setDisabledDec] = useState(true);
    const [disabledInc, setDisabledInc] = useState(false);

    const increment = () => {
        if (value < max) {
            setValue(value + 1);
            setDisabledDec(false);
        }
        if (value === max - 1) {
            setDisabledInc(true);
        }
        if (value === min) {
            setDisabledDec(false);
        }
    };

    const decrement = () => {
        if (value > min) {
            setValue(value - 1);
            if (value === min + 1) {
                setDisabledDec(true);
            }
        } else {
            setValue(min);
        }
        if (value === max) {
            setDisabledInc(false);
        }
    };
    const style = {
        display: hover ? "block" : "none"
    };
    return (
        <div className="check_wrapper">
            <div
                className={`check_wrapper__box ${disabledDec ? "mod-disabled" : ""}`}
                onClick={decrement}
            >
                <RemoveIcon />
            </div>
            <div
                className="check_wrapper__center"
            >
                <ArrowDropUpIcon style={style} onClick={increment} />
                {value}
                <ArrowDropDownIcon style={style} onClick={decrement} />
            </div>
            <div
                className={` check_wrapper__box  ${disabledInc ? "mod-disabled" : ""}`}
                onClick={increment}
            >
                <AddIcon />
            </div>
        </div>
    );
}
