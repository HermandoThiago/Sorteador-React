import React, { useState } from "react";
// import styles
import '../styles/sorteador.scss';
import '../styles/modalSorteado.scss';
// import components
import Lista from "./Lista";
import ModalSorteado from "./ModalSorteado";
import Inputs from "./Inputs";
import Premios from "./Premios";

export default function Sorteador(){

    const [lista, setLista] = useState([]);
    const [concorrente, setConcorrente] = useState("");
    const [sorteado, setSorteado] = useState("");
    const [modal, setModal] = useState(false);
    const [premio, setPremio] = useState("");
    const [ganhadores, setGanhadores] = useState([]);


    function addLista(concorrente){

        if(!concorrente){
            alert("Insira um nome válido")
            return false
        }else{
            setLista([...lista, concorrente]);
            setConcorrente("");
        }

    }

    const deleteLista = (a) => {
        let newList = lista.filter(e => e !== a );
        setLista(newList);
    }

    function sortear(){

       let ganhador = [...lista][Math.floor(Math.random() * lista.length)]

        if(!ganhador){

            alert("Adicione pelo menos um nome na lista")
        
        }else if(!premio){

            alert("Adicione um prêmio")

        }else{

            let data = {
                item: premio,
                ganhador: ganhador
            }

            setSorteado(ganhador);
            setGanhadores([...ganhadores, data]);
            setModal(true);
        }
    }

    function excluirSorteado(sorteado){
        let newList = lista.filter(a => a !== sorteado)
        setLista(newList);
        setSorteado("");
        setModal(false);
        setPremio("");
    }

    function fecharModal(){
        setSorteado("");
        setPremio("");
        setModal(false);
    }

    return(
        <>
            <ModalSorteado 
                premio={premio}
                sorteado={sorteado}
                modal={modal}
                setModal={fecharModal}
                excluir={() => excluirSorteado(sorteado)}
            />
            <section className="container">
                <div className="title">
                    <h1>Sorteador <span>CloudOpss</span></h1>
                </div>
                
                <div className="add">
                    <Inputs
                        type={"text"}
                        length={3}
                        change={(e) => setConcorrente(e.target.value)}
                        value={concorrente}
                        placeholder={"Nome"}
                     />
                     <button onClick={() => addLista(concorrente)}>Adicionar</button>
                    <Inputs 
                        type={"text"}
                        length={3}
                        change={(e) => setPremio(e.target.value)}
                        value={premio}
                        placeholder={"Prêmio"}
                    />
                    <button onClick={sortear}>Sortear</button>
                </div>
                <div className="listagem">
                    <div className="listagem-concorrentes">
                        {
                            lista.map((a) => {
                                return(
                                    <Lista nome={a} delete={() => deleteLista(a)}/>
                                )
                            }) 
                        }
                    </div>
                    <div className="listagem-ganhador-premio">
                        {
                            ganhadores.map((a) => {
                                return(
                                    <Premios 
                                        premio={a.item}
                                        ganhador={a.ganhador}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <footer>Desenvolvido pelo <span>CODEV</span></footer>
            </section>
        </>
    );

}