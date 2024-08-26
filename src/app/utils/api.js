export const fetchProfesores = async () => {
    try {
      const response = await fetch('https://localhost:7079/api/Profesor');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching profesores:', error);
      return [];
    }
  };
  

  export const fetchGrado = async () => {
    try {
      const response = await fetch('https://localhost:7079/api/grado');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Grado:', error);
      return [];
    }
  };
  
  export const fetchAlumno = async () => {
    try {
      const response = await fetch('https://localhost:7079/api/alumno');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Grado:', error);
      return [];
    }
  };