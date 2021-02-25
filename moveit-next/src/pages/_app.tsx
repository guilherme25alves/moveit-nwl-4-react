// Arquivo que colocamos todas as importações para todo o projeto, exemplo de um menu ou sidebar
// Colocar o que vai ficar em todas as páginas

import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (    
      <ChallengesProvider>
        <Component {...pageProps} />    
      </ChallengesProvider>
  )
}

export default MyApp
