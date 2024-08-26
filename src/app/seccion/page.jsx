"use client";

import { useState, useEffect, React } from 'react';
import Layout from '../components/layout';
import { FaEdit, FaTrash  } from 'react-icons/fa';
import { fetchAlumno, fetchGrado } from '../utils/api';



export default function AlumnoGrado() {
  const [alumnoGrad, setalumnoGrad] = useState([]);
  const [form, setForm] = useState({
      id: 0,
      alumnoId: '',
      gradoId: '',
      seccion: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
      const fetchalumnoGrad = async () => {
          try {
              const response = await fetch('https://localhost:7079/api/AlumnoGrado', { cache: 'force-cache' });
              if (!response.ok) {
                  throw new Error('Error al obtener los alumnoGrad');
              }
              const data = await response.json();
              setalumnoGrad(data);
          } catch (error) {
              console.error('Error al obtener los alumnoGrad:', error);
          }
      };
      
      fetchalumnoGrad();
  }, []);



    //llamamos los Alumnos
    const [alumnos, setAlumnos] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState('');
  
    useEffect(() => {
      const getAlumnos = async () => {
        const data = await fetchAlumno();
        setAlumnos(data);
      };
  
      getAlumnos();
    }, []);

    //llamamos los Grados
    const [grados, setGrados] = useState([]);
    const [selectedGrado, setSelectedGrado] = useState('');
     
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
      //setSelectedAlumno(e.target.value);  
      //setSelectedGrado(e.target.value);  

      console.log('Evento del Seccion:',e.target.value);
  };

  const [formValues, setFormValues] = useState({
    seccion: '',
    gradoId: '',
    alumnoId: ''
  });



  const handleChangeAlumno = (e) => {
    const { name, value } = e.target;
    setSelectedAlumno(e.target.value);
    setFormValues({
        ...formValues,
        alumnoId: e.target.value
      });

    if (name === "alumnoId") {
        setSelectedAlumno(value);
    }
    console.log('Evento del Alumno:',e.target.value);
  };
  
  const handleChangeGrado = (e) => {
    const { name, value } = e.target;
    setSelectedGrado(e.target.value);
    setFormValues({
        ...formValues,
        gradoId: e.target.value
      });

    if (name === "gradoId") {
        setSelectedGrado(value);
    }
    console.log('Evento del Grado:',e.target.value);
  };

  const handleChangeSeccion = (e) => {
    setFormValues({
      ...formValues,
      seccion: e.target.value
    });
  };



  const handleSubmit = async (e) => {
      e.preventDefault();
      // Aquí puedes acceder a todos los valores en formValues
      console.log('esto es formValues: ',formValues);
      try {
        console.log('Form id:', formValues.id);
        console.log('Form Alumno:', formValues.alumnoId);
        console.log('Form Grado:', formValues.gradoId);
        console.log('Form Seccion:', formValues.seccion);
          if (!formValues.alumnoId) {
              setError('Alumno es obligatorio');
              return;
          }
          if (!formValues.gradoId) {
            setError('Grado es obligatorio');
            return;
        }
        if (!formValues.seccion) {
            setError('La seccion es obligatoria');
            return;
        }

          const requestOptions = {
              method: formValues.id === 0 ? 'POST' : 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formValues)
          };

          const url = formValues.id === 0 
              ? 'https://localhost:7079/api/AlumnoGrado' 
              : `https://localhost:7079/api/AlumnoGrado/${formValues.id}`;

          const response = await fetch(url, requestOptions);

          if (!response.ok) {
              throw new Error('Error al guardar el Registro');
          }
          console.log('Url ver que tiene Id:',`https://localhost:7079/api/AlumnoGrado/${formValues.id}`);
          setFormValues({
              id: 0,
              alumnoId: '',
              gradoId: '',
              seccion: ''
          });
          setError('');

          // Refresh alumnoGrad
          const refreshedResponse = await fetch('https://localhost:7079/api/AlumnoGrado');
          const refreshedData = await refreshedResponse.json();
          setalumnoGrad(refreshedData);
      } catch (error) {
          setError(error.message || 'No se pudo conectar con la API. Por favor, verifique y trate de nuevo.');
          console.error('Error al realizar la solicitud:', error);
      }
  };

  const handleEdit = (gradoG) => {
      //setForm(almGrado);
      console.log('Editar id: ', gradoG.id);
      console.log('Editar Grado: ', gradoG.alumnoId);
      console.log('Editar Alumno: ', gradoG.gradoId);
      console.log('Editar Seccion: ', gradoG.seccion);
      setFormValues({
        id: gradoG.id,
        alumnoId: gradoG.alumnoId,
        gradoId: gradoG.gradoId,
        seccion: gradoG.seccion
    });
    setSelectedAlumno(gradoG.alumnoId); // Aquí se actualiza el estado del select
    setSelectedGrado(gradoG.gradoId); // Aquí se actualiza el estado del select    
  };

  //para crear nuevo registro, pero pimero verifica si hay datos sin guardar.
  const handleNew = async () => {
    // Verifica si hay datos en los campos
    if (formValues.alumnoId || formValues.gradoId || formValues.seccion) {
        const confirmAction = window.confirm("Hay cambios sin guardar. ¿Desea guardar los cambios antes de limpiar?");

        if (confirmAction) {
          try {
            // Si el usuario elige "Sí", guarda los datos
            await handleSubmit(new Event('submit')); // Simula el evento de envío del formulario
            // Después de guardar, limpia el formulario
            setForm({
                alumnoId: '',
                gradoId: '',
                seccion: ''
              // Otros campos...
            });
          } catch (error) {
            console.error('Error al guardar los datos:', error);
          }
    }else {
        // Si el usuario elige "No", simplemente limpia el formulario
        setForm({
            alumnoId: '',
            gradoId: '',
            seccion: ''
          // Otros campos...
        });
      }
    } else {
      // Si no hay datos en los campos, simplemente limpia el formulario
      setForm({
        alumnoId: '',
        gradoId: '',
        seccion: ''
        // Otros campos...
      });
    }
  };

  //Borrado de alumnoGrado
  const handleDelete = async (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar este AlumnoGrado?')) {
          try {
              const response = await fetch(`https://localhost:7079/api/AlumnoGrado/${id}`, {
                  method: 'DELETE'
              });
              
              if (!response.ok) {
                  throw new Error('Error al eliminar el AlumnoGrado');
              }

              setalumnoGrad(alumnoGrad.filter(r => r.id !== id));
          } catch (error) {
              console.error('Error al eliminar el AlumnoGrado:', error);
              setError('No se pudo eliminar el AlumnoGrado.');
          }
      }
  };

  

  //concateno alumnoGrado con Grado, para traer el grado correspondiente
  const gradosAlumGrado = alumnoGrad.map(gradoG => {
    const grado = grados.find(gra => gra.id === gradoG.gradoId);
    const alumno = alumnos.find(alum => alum.id === gradoG.alumnoId);
    return {
        ...gradoG,
        gradoNombre: grado ? `${grado.nombre}` : "Grado no encontrado",
        alumnoNombre: alumno ? `${alumno.nombre} ${alumno.apellido}` : "Alumno no encontrado"
    };
});
    return (
        
      
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Alumno Grado</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <select                    
                    name="alumnoId"
                    value={formValues.alumnoId}
                    //value={selectedAlumno} 
                    onChange={handleChangeAlumno}
                    placeholder="Alumno"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    <option value="" disabled>--Seleccione un alumno--</option>
                        {alumnos.map(alumno => (
                        <option key={alumno.id} value={alumno.id}>
                        {alumno.nombre} {alumno.apellido}
                        </option>
                        ))}
                </select>                   
                <select                    
                    name="gradoId"
                    value={formValues.gradoId}
                    //value={selectedGrado} 
                    onChange={handleChangeGrado}                    
                    placeholder="Grado"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    <option value="" disabled>--Seleccione un grado--</option>
                        {grados.map(grado => (
                        <option key={grado.id} value={grado.id}>
                        {grado.nombre} 
                        </option>
                        ))}
                </select>   
                <input
                    type="text"
                    name="seccion"
                    value={formValues.seccion}
                    onChange={handleChangeSeccion}
                    placeholder="Seccion"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                />              
                
               {/*  <button
                    type="button"
                    onClick={handleNew}
                    className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    Limpiar
                </button> */}
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
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Alumno</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Grado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Sección</th>
                        {/* Otros encabezados... */}                        
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {gradosAlumGrado.map((gradoG) => (
                        <tr key={gradoG.id} className="bg-gray-100 hover:bg-gray-200">
                            <td className="w-20 text-left py-3 px-4">{gradoG.id}</td>
                            <td className="text-left py-3 px-4">{gradoG.alumnoNombre}</td>
                            <td className="text-left py-3 px-4">{gradoG.gradoNombre}</td>
                            <td className="text-left py-3 px-4">{gradoG.seccion}</td>
                            {/* Otros campos... */}                            
                            <td className="text-left py-3 px-4">
                                <button
                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                    onClick={() => handleEdit(gradoG)}>
                                    <FaEdit className="h-6 w-6" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleDelete(gradoG.id)}>
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