import Layout from '../components/Layout';
import '../styles/globals.css';


export default function MovimientoInventario({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Movimiento de Inventario</h1>
        <p>Aquí va el contenido de la página de MovimientoInventario.</p>
      </div>
    );
  }
  