"use client";

import { useState, useEffect, React } from 'react';
import Layout from '../components/layout';
import { FaEdit, FaTrash  } from 'react-icons/fa';



export default function Profesor() {
  const [profesores, setprofesores] = useState([]);
  const [form, setForm] = useState({
      id: 0,
      nombre: '',
      apellido: '',
      genero: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
      const fetchprofesores = async () => {
          try {
              const response = await fetch('https://localhost:7079/api/profesor', { cache: 'force-cache' });
              if (!response.ok) {
                  throw new Error('Error al obtener los profesores');
              }
              const data = await response.json();
              setprofesores(data);
          } catch (error) {
              console.error('Error al obtener los profesores:', error);
          }
      };
      
      fetchprofesores();
  }, []);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (!form.nombre || !form.apellido) {
              setError('Nombre y Matrícula son obligatorios');
              return;
          }

          const requestOptions = {
              method: form.id === 0 ? 'POST' : 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form)
          };

          const url = form.id === 0 
              ? 'https://localhost:7079/api/profesor' 
              : `https://localhost:7079/api/profesor/${form.id}`;

          const response = await fetch(url, requestOptions);

          if (!response.ok) {
              throw new Error('Error al guardar el profesor');
          }
          console.log(`https://localhost:7079/api/profesor/${form.id}`);
          setForm({
              id: 0,
              nombre: '',
              apellido: '',
              genero: ''
          });
          setError('');

          // Refresh profesores
          const refreshedResponse = await fetch('https://localhost:7079/api/profesor');
          const refreshedData = await refreshedResponse.json();
          setprofesores(refreshedData);
      } catch (error) {
          setError(error.message || 'No se pudo conectar con la API. Por favor, verifique y trate de nuevo.');
          console.error('Error al realizar la solicitud:', error);
      }
  };

  const handleEdit = (profesor) => {
      setForm(profesor);
  };

  //para crear nuevo registro, pero pimero verifica si hay datos sin guardar.
  const handleNew = async () => {
    // Verifica si hay datos en los campos
    if (form.nombre || form.apellido || form.genero) {
        const confirmAction = window.confirm("Hay cambios sin guardar. ¿Desea guardar los cambios antes de limpiar?");

        if (confirmAction) {
          try {
            // Si el usuario elige "Sí", guarda los datos
            await handleSubmit(new Event('submit')); // Simula el evento de envío del formulario
            // Después de guardar, limpia el formulario
            setForm({
              nombre: '',
              apellido: '',
              genero: ''
              // Otros campos...
            });
          } catch (error) {
            console.error('Error al guardar los datos:', error);
          }
    }else {
        // Si el usuario elige "No", simplemente limpia el formulario
        setForm({
          nombre: '',
          apellido: '',
          genero: ''
          // Otros campos...
        });
      }
    } else {
      // Si no hay datos en los campos, simplemente limpia el formulario
      setForm({
        nombre: '',
        apellido: '',
        genero: ''
        // Otros campos...
      });
    }
  };

  //Borrado de profesor
  const handleDelete = async (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
          try {
              const response = await fetch(`https://localhost:7079/api/profesor/${id}`, {
                  method: 'DELETE'
              });
              
              if (!response.ok) {
                  throw new Error('Error al eliminar el profesor');
              }

              setprofesores(profesores.filter(r => r.id !== id));
          } catch (error) {
              console.error('Error al eliminar el profesor:', error);
              setError('No se pudo eliminar el profesor.');
          }
      }
  };


    return (
        
      
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Profesor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                />
                <select 
                   
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    placeholder="Genero"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    <option value="">--Seleccione una genero--</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>                
                {/* Otros campos... */}
                <button
                    type="button"
                    onClick={handleNew}
                    className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    Limpiar
                </button>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Guardar
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
        {/* Tabla */}
        <div className="mt-8 w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-20 text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Apellido</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Genero</th>
                        {/* Otros encabezados... */}                        
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {profesores.map((profesor) => (
                        <tr key={profesor.id} className="bg-gray-100 hover:bg-gray-200">
                            <td className="w-20 text-left py-3 px-4">{profesor.id}</td>
                            <td className="text-left py-3 px-4">{profesor.nombre}</td>
                            <td className="text-left py-3 px-4">{profesor.apellido}</td>
                            <td className="text-left py-3 px-4">{profesor.genero}</td>
                            {/* Otros campos... */}                            
                            <td className="text-left py-3 px-4">
                                <button
                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                    onClick={() => handleEdit(profesor)}>
                                    <FaEdit className="h-6 w-6" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleDelete(profesor.id)}>
                                    <FaTrash className="h-6 w-6 text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
        </Layout>
              
    );
  }