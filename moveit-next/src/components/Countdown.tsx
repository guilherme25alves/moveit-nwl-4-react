import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {

     const {  
               minutes,
               seconds,
               hasFinished, 
               isActive, 
               startCountdown,
               resetCountdown
          } = useContext(CountdownContext);

     // Formatação apenas para visualizar na tela, devido a isso ela permanece aqui e não no context do Countdown.
     const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
     const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); // padStart serve para tratar o seg/min 5 por exemplo, 
     //vai adicioar o 0 antes, ficando 05, ele valida a quantidade de 2(primeiro param) caracteres, se não tiver adicionar o que foi colocado como segundo param

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

               { hasFinished ? (
                    <button 
                         disabled
                         className={styles.countdownButton}
                    >
                         Ciclo encerrado
                    </button>
               ) : (
                 <>
                    { isActive ? 
                         (<button 
                              type="button" 
                              onClick={resetCountdown}
                              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                         >
                              Abandonar um ciclo
                         </button>)
                         :
                         (<button 
                              type="button" 
                              onClick={startCountdown}
                              className={styles.countdownButton}
                         >
                              Iniciar um ciclo
                         </button>)
                    }                 
                 </>   
               )}

                    
          </div>
     );
}