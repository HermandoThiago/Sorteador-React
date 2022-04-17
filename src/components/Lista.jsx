import React from "react";
import { FaTrash } from "react-icons/fa";

export default function Lista(props){

    return(
        <div className="concorrente">
            <span>{props.nome} </span>
            <button onClick={props.delete}>{<FaTrash />}</button>
        </div>
    );
}