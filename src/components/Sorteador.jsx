import React, { useState } from "react";
import '../styles/sorteador.scss';
import Lista from "./Lista";

export default function Sorteador(){

    const [lista, setLista] = useState([]);
    const [concorrente, setConcorrente] = useState("");


    function addLista(concorrente){
        setLista([...lista, concorrente]);
        setConcorrente("");
    }

    const deleteLista = (a) => {
        let newList = lista.filter(e => e !== a );
        setLista(newList);
    }

    return(
        <>
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
            </section>
            <footer>Desenvolvido pelo <span>CODEV</span></footer>
        </>
    );

}