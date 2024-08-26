import Layout from '../components/Layout';
import '../styles/globals.css';


export default function SubLinea({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Sub-Linea</h1>
        <p>Aquí va el contenido de la página de SubLinea.</p>
      </div>
    );
  }
  