import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Articulo({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Articulo</h1>
        <p>Aquí va el contenido de la página de Articulo.</p>
      </div>
    );
  }
  