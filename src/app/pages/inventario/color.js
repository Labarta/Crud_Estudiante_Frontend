// pages/ventas/Color.js
import Layout from '../components/Layout';
import '../styles/globals.css';


export default function Color({ Component, pageProps }) {
    return (
        
      <div>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <h1>Color</h1>
        <p>Aquí va el contenido de la página de Color.</p>
      </div>
    );
  }
  