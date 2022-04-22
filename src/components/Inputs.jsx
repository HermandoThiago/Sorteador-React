import React from 'react';

export default function Inputs(props){

    return(
        <>
        <input 
            type={props.type}
            required 
            minLength={props.length}
            onChange={props.change}
            value={props.value}
            placeholder={props.placeholder}
         />
        </>
    );

}