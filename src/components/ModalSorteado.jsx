import React from  "react";

export default function ModalSorteado(props){

    return(
        <>
            <div className={props.modal ? "modal-sorteado mostrar" : "modal-sorteado"}>
                <div className="box-modal">
                    <div className="sorteado">
                        <p>{props.sorteado}</p>
                    </div>
                    <div className="botoes">
                        <button onClick={props.setModal}>Novo sorteio</button>
                        <button>Excluir sorteado da lista</button>
                    </div>
                </div>
            </div>
        </>
    )

}