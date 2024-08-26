import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Linea({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Linea</h1>
        <p>Aquí va el contenido de la página de Linea.</p>
      </div>
    );
  }
  