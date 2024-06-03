import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("success");

    const updateMsg = (newMsg, newType, timeout = 3000) => {
        setMsg(newMsg);
        setType(newType);
        setTimeout(() => {
            setMsg("");
        }, timeout);
    };

    return (
        <AlertContext.Provider value={{ msg, type, updateMsg }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
