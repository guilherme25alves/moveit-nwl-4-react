import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';


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
}

interface ChallengesProviderProps {
     children: ReactNode; // Aceita qualquer elemento como Children 
}


export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children }: ChallengesProviderProps) {
     
     const [level, setLevel] = useState(1);
     const [currentExperience, setCurrentExperience] = useState(0);
     const [challengesCompleted, setChallengesCompleted] = useState(0);

     const[activeChallenge, setActiveChallenge] = useState(null);

     const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

     function levelUp() {
          setLevel(level + 1);
     }

     function startNewChallenge() {
          const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
          const challenge = challenges[randomChallengeIndex];

          setActiveChallenge(challenge);
     }

     function resetChallenge() {
          setActiveChallenge(null);
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
                         resetChallenge
                      }}>
               { children }
          </ChallengesContext.Provider>
     )
}



/*
     Com a criação da classe de Contexto, podemos compartilhar as informações entre os componentes, sem que os mesmos tenha ligação direta,
          como relação de pai-filho 

     Recuperamos essas informações dentro de cada componente utilizando a função useContext(*p)

     *p -> passando o Contexto criado como parâmetro para poder acessar seus dados

*/