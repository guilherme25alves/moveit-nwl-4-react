import styles from '../styles/components/CompleteChallenges.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function CompleteChallenges() {
     
     const { challengesCompleted } = useContext(ChallengesContext);
     
     return (
          <div className={styles.completeChallengesContainer}>
               <span>Desafios Completos</span>
               <span>{challengesCompleted}</span>               
          </div>          
     );
}