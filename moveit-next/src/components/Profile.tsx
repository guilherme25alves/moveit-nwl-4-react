import styles from '../styles/components/Profile.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';

export default function Profile() {

     const { level } = useContext(ChallengesContext);

     return(
          <div className={styles.profileContainer}>
               <img src="https://github.com/guilherme25alves.png" alt="Guilherme Alves" />
               <div>
                    <strong>Guilherme Alves</strong>
                    <p>
                         <img src="icons/level.svg" alt="Level" />
                         Level { level }
                    </p>
               </div>
          </div>
     );
}