import React from "react";

export default function Premios(props){

    return(
        <div className="premios">
            <span className="premio">{props.premio} - </span>
            <span className="ganhador">{props.ganhador}</span>
        </div>
    );

}