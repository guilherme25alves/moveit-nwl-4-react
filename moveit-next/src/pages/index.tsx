import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import Head from 'next/head';

import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";


interface HomeProps {
  level: number; 
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level= { props.level }
      currentExperience= { props.currentExperience }
      challengesCompleted = { props.challengesCompleted }
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>      
        
        <ExperienceBar />

        <CountdownProvider> 
          <section>
            <div  >
                <Profile />
                <CompleteChallenges />
                <Countdown />
            </div>
            <div>
                <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider> 
  )
}

// Function executada no servidor Node! Podemos com ela fazer a interação entre a camada Intermediária e o Front 
export const getServerSideProps: GetServerSideProps = async (ctx) => { // Function deve ter esse nome 
  
  const { level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}


/*
  ** Exemplo 

    Back-end (Ruby)
    Next.js (Node.js) => Camada intermediária
    Front-end (React)

*/