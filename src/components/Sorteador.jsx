import React, { useState } from "react";
// import styles
import '../styles/sorteador.scss';
import '../styles/modalSorteado.scss';
// import components
import Lista from "./Lista";
import ModalSorteado from "./ModalSorteado";

export default function Sorteador(){

    const [lista, setLista] = useState([]);
    const [concorrente, setConcorrente] = useState("");
    const [sorteado, setSorteado] = useState("");
    const [modal, setModal] = useState(false);


    function addLista(concorrente){
        setLista([...lista, concorrente]);
        setConcorrente("");
    }

    const deleteLista = (a) => {
        let newList = lista.filter(e => e !== a );
        setLista(newList);
    }

    function sortear(){

       let ganhador = [...lista][Math.floor(Math.random() * lista.length)]

        if(!ganhador){
            ganhador = "Não existe ganhador"
        }

       setSorteado(ganhador);
       setModal(true);
    }

    return(
        <>
            <ModalSorteado 
            sorteado={sorteado}
            modal={modal}
            setModal={() => setModal(!modal)}
            />
            <section className="container">
                <div className="title">
                    <h1>Sorteador <span>CloudOpss</span></h1>
                </div>
                
                <div className="add">
                    <input 
                    type="text"
                    onChange={e => setConcorrente(e.target.value)}
                    value={concorrente}
                    placeholder="Insira o novo concorrente"
                    />
                    <button onClick={() => addLista(concorrente)}>Adicionar</button>
                    <button onClick={sortear}>Sortear</button>
                </div>
                    <div className="listagem">
                        {
                            lista.map((a) => {
                                return(
                                    <Lista nome={a} delete={() => deleteLista(a)}/>
                                )
                            })
                        }
                    </div>
                    <footer>Desenvolvido pelo <span>CODEV</span></footer>
            </section>
            
        </>
    );

}