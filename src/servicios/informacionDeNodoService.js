import axios from 'axios';

//Trae todos los usuarios
export default {

    getAllNodos: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
        let res = await axios.get('http://localhost:3002/nodos/nodos',{params: {
          email: parametros.email
        }});
        return res.data || []
    },
    
    getNodo: async(parametros)=>{

        let res = await axios.get(`/api/nodo/`,{params: {
            email: parametros.email,
            nombre: parametros.nombre
          }});
        return res.data || [];
    },

    getConfigNodos: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
      let res = await axios.get('http://localhost:3002/nodos/configNodo',{params: {
        email: parametros.email
      }});
      return res.data || []
    },

    registrarNodo: async (parametros) =>{
        console.log(parametros)
        let res = axios.post('/api/nodo', {
         nombre: parametros.nombre,
         tipo: parametros.tipo,
         conexiones: parametros.conexiones,
         email: parametros.email,
         descripcion: parametros.descripcion,
         fechaAlta: parametros.fechaAlta
   
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
     
   
     },

     getNodoPorNombre: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
      let res = await axios.get('http://localhost:3002/nodos/informacionPorNombre',{params: {
        email: parametros.email,
        nombre: parametros.nombre
      }});
      return res.data || []
    },

     /*
     sensorDeNodo: async (parametros) => {
      let res = await axios.get('http://localhost:3002/nodos/configNodo',{params: {
        email: parametros.email,
        sensor: parametros.sensor
      }});
      return res.data || []
     }

     */


     getUltimaInformacionDeNodos: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
      let res = await axios.get('http://localhost:3002/nodos/ultimaInformacionDeNodos',{params: {
        email: parametros.email,
        nombre: parametros.nombre
      }});
      return res.data || []
    },

    getConfigUnNodo: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
      let res = await axios.get('http://localhost:3002/nodos/configUnNodo',{params: {
        email: parametros.email,
        nombreNodo: parametros.nombreNodo,
      }});
      return res.data || []
    },

}