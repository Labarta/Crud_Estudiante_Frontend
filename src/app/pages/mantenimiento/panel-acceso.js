import Layout from '../components/Layout';
import '../styles/globals.css';


export default function PanelAcceso({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Panel de Acceso</h1>
        <p>Aquí va el contenido de la página de PanelAcceso.</p>
      </div>
    );
  }
  