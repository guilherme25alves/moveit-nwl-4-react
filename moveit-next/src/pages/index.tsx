import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Move.it</title>
      </Head>      
      
      <ExperienceBar />

      <section>
        <div  >
            <Profile />
            <CompleteChallenges />
            <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
