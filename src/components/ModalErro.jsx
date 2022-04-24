import React from "react";

export default function ModalErro(props){

    return(
        <div className={props.modal ? "bg-erro mostrar" : "bg-erro"}>
            <div className="modal-erro">
                <h2>{props.erro}</h2>
                <button onClick={props.fechar}>Fechar</button>
            </div>
        </div>
    );

}