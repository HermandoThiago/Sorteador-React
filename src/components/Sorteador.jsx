import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
// import styles
import '../styles/sorteador.scss';
import '../styles/modalSorteado.scss';
import '../styles/modalErro.scss';
// import components
import Lista from "./Lista";
import ModalSorteado from "./ModalSorteado";
import Inputs from "./Inputs";
import Premios from "./Premios";
import ModalErro from "./ModalErro";

export default function Sorteador(){

    const [lista, setLista] = useState([]);
    const [concorrente, setConcorrente] = useState("");
    const [sorteado, setSorteado] = useState("");
    const [modal, setModal] = useState(false);
    const [ccc, setCcc] = useState(0)
    const [premio, setPremio] = useState("");
    const [ganhadores, setGanhadores] = useState([]);
    const [modalErrors, setModalErrors] = useState(
        {
            user: "Preencha o nome do concorrente com pelo menos 3 caracteres",
            modalUser: false,
            premio: "Digite o nome do prêmio",
            modalPremio: false,
            lista: "Adicione pelo menos um concorrente na lista",
            modalLista: false
        })

    const soundMp3 = require("../assets/audios/piao_casa_propria.mp3")

    const callMySound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play()
    }

    function addLista(concorrente){

        if(!concorrente || concorrente.length < 3){
            setModalErrors({...modalErrors, modalUser: true})
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

            setModalErrors({...modalErrors, modalLista: true})
        
        }else if(!premio){

            setModalErrors({...modalErrors, modalPremio: true})

        }else{

            let data = {
                item: premio,
                ganhador: ganhador
            }

            callMySound(soundMp3)            

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
            <ModalErro 
                erro={modalErrors.user}
                modal={modalErrors.modalUser}
                fechar={() => setModalErrors({...modalErrors, modalUser: false})}
            />
            <ModalErro 
                erro={modalErrors.premio}
                modal={modalErrors.modalPremio}
                fechar={() =>  setModalErrors({...modalErrors, modalPremio: false})}
            />
            <ModalErro 
                erro={modalErrors.lista}
                modal={modalErrors.modalLista}
                fechar={() => setModalErrors({...modalErrors, modalLista: false})}
            />
            <section className="container">
                <div className="title">
                    <h1>Sorteador <span>CloudOpss</span></h1>
                </div>
                
                <div className="add">
                    <Inputs
                        type={"text"}
                        change={(e) => setConcorrente(e.target.value)}
                        value={concorrente}
                        placeholder={"Nome"}
                     />
                     <button onClick={() => addLista(concorrente)}>Adicionar</button>
                    <Inputs 
                        type={"text"}
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