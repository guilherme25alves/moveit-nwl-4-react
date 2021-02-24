import styles from '../styles/components/Profile.module.css';

export default function Profile() {
     return(
          <div className={styles.profileContainer}>
               <img src="https://github.com/guilherme25alves.png" alt="Guilherme Alves" />
               <div>
                    <strong>Guilherme Alves</strong>
                    <p>
                         <img src="icons/level.svg" alt="Level" />
                         Level 1
                    </p>
               </div>
          </div>
     );
}