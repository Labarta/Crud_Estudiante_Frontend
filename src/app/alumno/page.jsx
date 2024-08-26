"use client";

import { useState, useEffect, React } from 'react';
import Layout from '../components/layout';
import { FaEdit, FaTrash  } from 'react-icons/fa';



export default function Soporte() {
  const [alumnos, setalumnos] = useState([]);
  const [form, setForm] = useState({
      id: 0,
      nombre: '',
      apellido: '',
      genero: '',
      fechaNacimiento: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
      const fetchalumnos = async () => {
          try {
              const response = await fetch('https://localhost:7079/api/Alumno', { cache: 'force-cache' });
              if (!response.ok) {
                  throw new Error('Error al obtener los alumnos');
              }
              const data = await response.json();
              setalumnos(data);
          } catch (error) {
              console.error('Error al obtener los alumnos:', error);
          }
      };
      
      fetchalumnos();
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
              ? 'https://localhost:7079/api/Alumno' 
              : `https://localhost:7079/api/Alumno/${form.id}`;

          const response = await fetch(url, requestOptions);

          if (!response.ok) {
              throw new Error('Error al guardar el alumno');
          }
          console.log(`https://localhost:7079/api/Alumno/${form.id}`);
          setForm({
              id: 0,
              nombre: '',
              apellido: '',
              genero: '',              
              fechaNacimiento: ''
          });
          setError('');

          // Refresh alumnos
          const refreshedResponse = await fetch('https://localhost:7079/api/Alumno');
          const refreshedData = await refreshedResponse.json();
          setalumnos(refreshedData);
      } catch (error) {
          setError(error.message || 'No se pudo conectar con la API. Por favor, verifique y trate de nuevo.');
          console.error('Error al realizar la solicitud:', error);
      }
  };

  const handleEdit = (alumno) => {
      setForm(alumno);
  };
  //Borrado de Alumno
  const handleDelete = async (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
          try {
              const response = await fetch(`https://localhost:7079/api/Alumno/${id}`, {
                  method: 'DELETE'
              });
              
              if (!response.ok) {
                  throw new Error('Error al eliminar el alumno');
              }

              setalumnos(alumnos.filter(r => r.id !== id));
          } catch (error) {
              console.error('Error al eliminar el alumno:', error);
              setError('No se pudo eliminar el alumno.');
          }
      }
  };


    return (
        
      
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Estudiantes</h2>
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
                <input
                    type="date"
                    name="fechaNacimiento"
                    value={form.fechaNacimiento}
                    onChange={handleChange}
                    placeholder="Fecha de Naciemiento"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {/* Otros campos... */}
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
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha de Nacimiento</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {alumnos.map((alumno) => (
                        <tr key={alumno.id} className="bg-gray-100 hover:bg-gray-200">
                            <td className="w-20 text-left py-3 px-4">{alumno.id}</td>
                            <td className="text-left py-3 px-4">{alumno.nombre}</td>
                            <td className="text-left py-3 px-4">{alumno.apellido}</td>
                            <td className="text-left py-3 px-4">{alumno.genero}</td>
                            {/* Otros campos... */}
                            <td className="text-left py-3 px-4">{new Date(alumno.fechaNacimiento).toLocaleDateString()}</td>
                            <td className="text-left py-3 px-4">
                                <button
                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                    onClick={() => handleEdit(alumno)}>
                                    <FaEdit className="h-6 w-6" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleDelete(alumno.id)}>
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