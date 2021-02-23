import React from "react";
import {useState } from 'react'

interface ButtonProps {
     color: string;
     children: string;
}

export default function Button(props: ButtonProps) {     
     const [counter, setCounter] = useState(1);
     
     function increment() {
          setCounter(counter + 1);
     }

     return (
          <button 
               type="button"
               onClick={increment}
               style={{ backgroundColor: props.color }} 
          >
               Botão 
               {props.children}
               <strong>{counter}</strong>
          </button>
     )
}