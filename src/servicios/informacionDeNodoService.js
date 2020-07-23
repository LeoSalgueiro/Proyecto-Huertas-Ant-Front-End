import axios from 'axios';

//Trae todos los usuarios
export default {

    getAllNodos: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
        let res = await axios.get(`/api/nodos`,{params: {
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

}