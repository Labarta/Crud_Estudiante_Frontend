import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Usuario({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Usuario</h1>
        <p>Aquí va el contenido de la página de Usuario.</p>
      </div>
    );
  }
  