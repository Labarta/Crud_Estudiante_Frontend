import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Colores({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Colores</h1>
        <p>Aquí va el contenido de la página de Colores.</p>
      </div>
    );
  }
  