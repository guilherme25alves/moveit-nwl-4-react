// Arquivo que colocamos todas as importações para todo o projeto, exemplo de um menu ou sidebar
// Colocar o que vai ficar em todas as páginas

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (                 
      <Component {...pageProps} />              
  )
}

export default MyApp

// CountdownProvider deve ficar abaixo do ChallengeProvider porque o CountProv depende do ChallProv 
