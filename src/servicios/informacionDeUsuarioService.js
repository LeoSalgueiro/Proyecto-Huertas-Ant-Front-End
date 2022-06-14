import axios from 'axios';

//Trae todos los usuarios
export default {
  getAllUsers: async () => {
    let res = await axios.get(process.env.APIWEB || 'http://localhost:3002/usuarios');
    return res.data || [];
  },

  registrarUsuario: async (parametros) =>{
     console.log(parametros)
     let res = axios.post(process.env.APIWEB || 'http://localhost:3002/usuarios/insert', {
      foto:[],
      nombre: parametros.name,
      apellido: parametros.surname,
      dni: parametros.dni,
      direccion: parametros.direccion,
      fechaNac: parametros.fechaNac,
      genero: parametros.genero,
      email: parametros.email,
      password: parametros.password,
      nombreUser: parametros.nombreUser

    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  

  }, 
  getUsuario: async (parametros) => {
    console.log(parametros)

    //console.log("Esto es email " + email +" y esto es pass "+ pass);
    let res = await axios.post(process.env.APIWEB || 'http://localhost:3002/usuarios',{
      username: parametros.username,
      password: parametros.password
    });
    return res.data || [];
  },

  //NO IMPLEMENTADO EN API
  cambiarContra: async (parametros) => {
    let email = parametros.email;
    let pass = parametros.contraseña;
    //console.log("Esto es email " + email +" y esto es pass "+ pass);
    console.log('numero 2: ' + email)
    let res = await axios.put(`/api/usuario/`,{params: {
      username: email,
      password: pass
    }});
    return res.data || [];
  },

  //NO IMPLEMENTADO EN API
  ponerFoto: async (parametros) =>{
        let foto = parametros.foto;
        let email = parametros.email;
        console.log(foto);
        let response = await axios.put(`/api/usuario/`,{params:{username:email, foto: foto}});
        return response.data || [];
  },

  login: async (email,contra) =>{
    
    let response = await axios.post(process.env.APIWEB || 'http://localhost:3002/auth/login', {username:email, password: contra})
    .then((res) =>{
      if(handleResponse(res)!=res.error){ console.log('este es el user final: '+res.data.access_token)}
      localStorage.setItem('user', JSON.stringify({access_token:res.data.access_token}));
      
      sessionStorage.setItem('email', email);
            return res.data || [];
    })
    .catch((error)=>{
      if(error.response.status === 400){

        return error.response.data.message
      }
      else if(error.response.status === 401){
        return error.response.data.message
      }
      else{
        console.log('no soy 400')
        return error.response.data.message
      }
    })         
  }
}

//funciones de storage
function handleResponse(response) {

      
      if (response.statusText !== 'OK') {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              //location.reload(true);
          }

          const error = (response && response.message) || response.statusText;
          return Promise.reject(error);
      }

      return response;

}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}