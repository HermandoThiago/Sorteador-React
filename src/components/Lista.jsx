import React from "react";
import { FaTrash } from "react-icons/fa";

export default function Lista(props){

    return(
        <div className="concorrente">
            <div className="nome">
                <span>{props.nome} </span>
            </div>
            <div className="deletar-button">
                <button onClick={props.delete}>{<FaTrash />}</button>
            </div>
        </div>
    );
}