"use client";

import { useState, useEffect, React } from 'react';
import Layout from '../components/layout';
import { FaEdit, FaTrash  } from 'react-icons/fa';
import { fetchProfesores, fetchGrado } from '../utils/api';



export default function Grado() {

  const [grados, setgrados] = useState([]);
  const [form, setForm] = useState({
      id: 0,
      nombre: '',
      profesorId: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
      const fetchgrados = async () => {
          try {
              const response = await fetch('https://localhost:7079/api/grado/', { cache: 'force-cache' });
              if (!response.ok) {
                  throw new Error('Error al obtener los grados');
              }
              const data = await response.json();
              setgrados(data);
              console.log('Grados: ', data); // Verifica los datos aquí
          } catch (error) {
              console.error('Error al obtener los grados:', error);
          }
      };
      
      fetchgrados();
  }, []);



  //Declaramos las variables para datos del profesor desde utils/api.js
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState('');

  useEffect(() => {
    const getProfesores = async () => {
      const data = await fetchProfesores();
      setProfesores(data);
    };

    getProfesores();
  }, []);

    

  useEffect(() => {
    const getGrados = async () => {
      const data = await fetchGrado();
      setGrados(data);
    };

    getGrados();
  }, []);


  const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
      setSelectedProfesor(e.target.value);    
      //setSelectedGrados(e.target.value); 
      console.log('Evento del Profesor:',e.target.name);

      if (name === "profesorId") {
        setSelectedProfesor(value);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
            console.log('Form Nombre:', form.nombre);
            console.log('Form ProfesorId:', form.profesorId);
          if (!form.nombre) {
              setError('Nombre es obligatorio');
              return;
          }
          if (!form.profesorId) {
            setError('Campo Profesor es obligatorio');
            return;
        }
          
          const requestOptions = {
              method: form.id === 0 ? 'POST' : 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form)

          };
          console.log('ContenIdo a guardar: ',requestOptions);
          const url = form.id === 0 
              ? 'https://localhost:7079/api/grado' 
              : `https://localhost:7079/api/grado/${form.id}`;

          const response = await fetch(url, requestOptions);

          if (!response.ok) 
            {
              // Manejar el error
              console.error('Error en la solicitud:', response.statusText);
              throw new Error('Error al guardar el grado');              
            }
          //console.log(`https://localhost:7079/api/grado/${form.id}`);
          setForm({
              Id: 0,
              Nombre: '',
              profesorId: ''

          });
          setError('');

          // Refresh grados
          const refreshedResponse = await fetch('https://localhost:7079/api/grado');
          const refreshedData = await refreshedResponse.json();
          setgrados(refreshedData);
      } catch (error) {
          setError(error.message || 'No se pudo conectar con la API. Por favor, verifique y trate de nuevo.');
          console.error('Error al realizar la solicitud:', error);
      }
  };

  

  const handleEdit = (grado) => {
      //setForm(grado);
      setForm({
        id: grado.id,
        nombre: grado.nombre,
        profesorId: grado.profesorId
    });

    setSelectedProfesor(grado.profesorId); // Aquí se actualiza el estado del select
  };


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
              profesorId: ''
              // Otros campos...
            });
          } catch (error) {
            console.error('Error al guardar los datos:', error);
          }
    }else {
        // Si el usuario elige "No", simplemente limpia el formulario
        setForm({
            nombre: '',
            profesorId: ''
        });
      }
    } else {
      // Si no hay datos en los campos, simplemente limpia el formulario
      setForm({
        nombre: '',
        profesorId: ''
      });
    }
  };




  //Borrado de grado
  const handleDelete = async (Id) => {
      
        if (confirm('¿Estás seguro de que deseas eliminar este grado?')) {
            //console.log('Id a eliminar:', Id); // Verificamos que el Id sea el correcto
            try {
                const response = await fetch(`https://localhost:7079/api/grado/${Id}`, {
                    method: 'DELETE'
                });
                console.log('Respuesta del servIdor:', response);
                if (!response.ok) {
                    throw new Error('Error al eliminar el grado');
                }
  
                setgrados(grados.filter(r => r.Id !== Id));
            } catch (error) {
                console.error('Error al eliminar el grado:', error);
                //setError('No se pudo eliminar el grado.');
                alert(error.message);
            }
        }
      
      
  };

  const [prf, setPrf] = useState([]);

  useEffect(() =>{
    // Fetch de los profesores
    fetch('https://localhost:7079/api/Profesor')
    .then((response) => response.json())
    .then((data) => setPrf(data));
  }, [])
  
  //Sacar Nombre y apellIdo del profesor, con el pofesorId
  const obtenerNombreProfesor = (ProfesorId) => {
    if (!prf.length) return 'Cargando...';
    const profesor = prf.find(prof => prof.id === ProfesorId);
    return profesor ? `${profesor.nombre} ${profesor.apellIdo}` : 'Profesor no encontrado';
};

//concateno grado con profesor, para traer el nombre y apellido del profesor
const gradosConProfesores = grados.map(grado => {
    const profesor = profesores.find(prof => prof.id === grado.profesorId);
    return {
        ...grado,
        profesorNombre: profesor ? `${profesor.nombre} ${profesor.apellido}` : "Profesor no encontrado"
    };
});

    console.log('obtenerProfesor: ', obtenerNombreProfesor)

    return (
        
      
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Grado</h2>
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
                <select                    
                    name="profesorId"
                    //value={form.profesorId}
                    value={selectedProfesor} 
                    onChange={handleChange}
                    placeholder="Profesor"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    <option value="" disabled>--Seleccione una profesor--</option>
                        {profesores.map(profesor => (
                        <option key={profesor.id} value={profesor.id}>
                        {profesor.nombre} {profesor.apellido}
                        </option>
                        ))}
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
        <div className="mt-8 w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hIdden">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Id</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Grado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Profesor</th>
                        {/* Otros encabezados... */}                        
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {gradosConProfesores.map((grado) => (
                        <tr key={grado.Id} className="bg-gray-100 hover:bg-gray-200">
                            <td className="text-left py-3 px-4">{grado.id}</td>
                            <td className="text-left py-3 px-4">{grado.nombre}</td>
                            <td className="text-left py-3 px-4">{grado.profesorNombre}</td>
                            {/* Otros campos... */}                            
                            <td className="text-left py-3 px-4">
                                <button
                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                    onClick={() => handleEdit(grado)}>
                                    <FaEdit className="h-6 w-6" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleDelete(grado.id)}>
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