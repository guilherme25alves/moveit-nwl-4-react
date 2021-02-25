import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

let countdownTimeout: NodeJS.Timeout; // Tipagem Global, apenas para sabermos do que se trata a variável

export function Countdown() {

     const { startNewChallenge } = useContext(ChallengesContext);

     const [time, setTime] = useState(0.1 * 60);
     const [isActive, setIsActive] = useState(false);
     const [hasFinished, setHasFinished] = useState(false);

     const minutes = Math.floor(time/60);
     const seconds = time % 60;

     const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
     const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); // padStart serve para tratar o seg/min 5 por exemplo, 
     //vai adicioar o 0 antes, ficando 05, ele valida a quantidade de 2(primeiro param) caracteres, se não tiver adicionar o que foi colocado como segundo param

     function startCountdown() {
          setIsActive(true);
     }

     function resetCountdown() {
          clearTimeout(countdownTimeout);
          setIsActive(false);
          setTime(0.1 * 60);
     }

     // Exeecuta sempre o valor da var isActive e time mudar
     useEffect(() => {
          if(isActive && time > 0) {
              countdownTimeout = setTimeout(() => {
                    setTime(time - 1);
               }, 1000);
          } else if(isActive && time === 0) { 
               setHasFinished(true);
               setIsActive(false);
               startNewChallenge();
          }
     }, [isActive, time]);

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