import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect } from 'react';

export function Countdown() {

     const [time, setTime] = useState(25 * 60);
     const [active, setActive] = useState(false);

     const minutes = Math.floor(time/60);
     const seconds = time % 60;

     const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
     const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); // padStart serve para tratar o seg/min 5 por exemplo, 
     //vai adicioar o 0 antes, ficando 05, ele valida a quantidade de 2(primeiro param) caracteres, se não tiver adicionar o que foi colocado como segundo param

     function startCountdown() {
          setActive(true);
     }

     // Exeecuta sempre o valor da var active e time mudar
     useEffect(() => {
          if(active && time > 0) {
               setTimeout(() => {
                    setTime(time - 1);
               }, 1000);
          }
     }, [active, time]);

     return (
          <div>
               <div className={styles.countdownContainer}>
                    <div>
                         <span>{minuteLeft}</span>
                         <span>{minuteRight}</span>
                    </div>
                    <span>:</span>
                    <div>
                         <span>{secondLeft}</span>
                         <span>{secondRight}</span>
                    </div>
               </div>

               <button 
                    type="button" 
                    onClick={startCountdown}
                    className={styles.countdownButton}
               >
                    Iniciar um ciclo
               </button>
          </div>
     );
}