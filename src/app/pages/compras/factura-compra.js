import Layout from '../components/Layout';
import '../styles/globals.css';


export default function FacturaCompra({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Factura de Compra</h1>
        <p>Aquí va el contenido de la página de FacturaCompra.</p>
      </div>
    );
  }
  