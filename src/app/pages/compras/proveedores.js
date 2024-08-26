import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Proveedores({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Proveedores</h1>
        <p>Aquí va el contenido de la página de Proveedores.</p>
      </div>
    );
  }
  