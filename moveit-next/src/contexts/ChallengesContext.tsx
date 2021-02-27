import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge {
     type: 'body' | 'eye';
     description: string;
     amount: number;
}

interface ChallengesContextData {
     level: number; 
     currentExperience: number; 
     experienceToNextLevel: number;
     challengesCompleted: number; 
     activeChallenge: Challenge;
     levelUp: () => void;
     startNewChallenge: () => void;
     resetChallenge: () => void;
     completeChallenge: () => void;
     closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
     children: ReactNode; // Aceita qualquer elemento como Children 
     level: number; 
     currentExperience: number;
     challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children, ...restVars }: ChallengesProviderProps) {
     
     const [level, setLevel] = useState(restVars.level ?? 1);
     const [currentExperience, setCurrentExperience] = useState(restVars.currentExperience ?? 0);
     const [challengesCompleted, setChallengesCompleted] = useState(restVars.challengesCompleted ?? 0);

     const[activeChallenge, setActiveChallenge] = useState(null);

     const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

     const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

     useEffect(() => {
          // API do Browser, para pedir permissão para notificações ao usuário 

          Notification.requestPermission();
     }, []);

     // gravar dados nos Cookies
     useEffect(() => {
          Cookies.set('level', String(level));
          Cookies.set('currentExperience', String(currentExperience));
          Cookies.set('challengesCompleted', String(challengesCompleted));
     }, [level, currentExperience, challengesCompleted]);

     function levelUp() {
          setLevel(level + 1);
          setIsLevelUpModalOpen(true);
     }

     function closeLevelUpModal() {
          setIsLevelUpModalOpen(false);
     }

     function startNewChallenge() {
          const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
          const challenge = challenges[randomChallengeIndex];

          setActiveChallenge(challenge);

          new Audio('/notification.mp3').play();

          if(Notification.permission === 'granted') {
               new Notification('Novo desafio 🎉', {
                    body: `Valendo ${challenge.amount} xp`,
               })
          }
     }

     function resetChallenge() {
          setActiveChallenge(null);
     }

     function completeChallenge() {
          if(!activeChallenge) {
               return;
          }

          const { amount } = activeChallenge;

          let finalExperience = currentExperience + amount;

          if(finalExperience >= experienceToNextLevel) {
               finalExperience = finalExperience - experienceToNextLevel;
               levelUp();
          }

          setCurrentExperience(finalExperience);
          setActiveChallenge(null);
          setChallengesCompleted(challengesCompleted + 1);

     }

     return(
          <ChallengesContext.Provider 
               value={{ 
                         level, 
                         currentExperience, 
                         experienceToNextLevel,
                         challengesCompleted, 
                         activeChallenge,
                         levelUp,
                         startNewChallenge, 
                         resetChallenge,
                         completeChallenge, 
                         closeLevelUpModal
                      }}>
               { children }
              { isLevelUpModalOpen && <LevelUpModal />} 
          </ChallengesContext.Provider>
     )
}



/*
     Com a criação da classe de Contexto, podemos compartilhar as informações entre os componentes, sem que os mesmos tenha ligação direta,
          como relação de pai-filho 

     Recuperamos essas informações dentro de cada componente utilizando a função useContext(*p)

     *p -> passando o Contexto criado como parâmetro para poder acessar seus dados

*/