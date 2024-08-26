import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Modelo({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Modelo</h1>
        <p>Aquí va el contenido de la página de Modelo.</p>
      </div>
    );
  }
  