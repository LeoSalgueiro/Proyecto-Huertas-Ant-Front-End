
import React, { useState, useEffect } from 'react';
import NodoService from '../../servicios/informacionDeNodoService';

export const GridEstadosActuales = (props) => { 

    const [data, setData] = useState([]);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {

        setData(props)
        /*
        const email = sessionStorage.getItem('email')
        const listaNodos = sessionStorage.getItem('listaNodos')
        let param = {email: email, listaNombres: listaNodos}
        NodoService.getUltimaInformacionDeNodos(param).then((resp)=>{
            const datos = []
        
            //A REVISAR PARA ACOMODAR LA INFORMACION
            resp.forEach((element, index) => {
                    const infoNodo = {
                    Fecha:"",
                    Temperatura:""
                }
                infoNodo.Fecha = new Date(element.fechaAlta).toLocaleString('es-AR')//(element.fechaAlta).toLocaleString('es-AR');
                infoNodo.Temperatura = Math.floor(element.conexiones[2].valor);
                datos.push(infoNodo)
            });
            setData(datos.reverse())
        })  
        */
        forceUpdate();
    },[])

    return(
       <div>{props[0]}</div> 
    );


}