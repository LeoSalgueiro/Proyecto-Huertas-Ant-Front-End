import React, { useState, useEffect } from 'react';
import NodoService from '../../servicios/informacionDeNodoService';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';


export const GraficoNodoHumedadAmbiente = (props) => {
  const [data, setData] = useState([]);




  


  useEffect(() => {
  

      let param = {email: props.email, nombre: props.nombre}
      NodoService.getNodoPorNombre(param).then((resp)=>{
        console.log(resp)
        const datos = []
        
        resp.forEach((element, index) => {
          const infoNodo = {
            Fecha:"",
            Humedad:""
          }
          infoNodo.Fecha = new Date(element.fechaAlta).toLocaleString('es-AR')//(element.fechaAlta).toLocaleString('es-AR');
          infoNodo.Humedad = Math.floor(element.conexiones[2].valor);
          datos.push(infoNodo)
        });
        setData(datos.reverse())
      })


    //asyncFetch();
  }, []);


  const config = {
    data,
    padding: 'auto',
    xField: 'Fecha',
    yField: 'Humedad',
    annotations: [
      // 低于中位数颜色变化 alguna cosa en chino
      //para maximo
      {
        type: 'regionFilter',
        start: ['min', 80],
        end: ['max', 200],
        color: '#d60404',
        
      },
      {
        type: 'line',
        start: ['min', 80],
        end: ['max', 80],
        style: {
          stroke: '#f44a4a',
          lineDash: [2, 2],
          
        },
      },

      //par minimo
      {
        type: 'regionFilter',
        start: ['min', 60],
        end: ['max', '0'],
        color: '#d60404',
        
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: 'Alerta de humedad',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 60],
        end: ['max', 60],
        style: {
          stroke: '#f44a4a',
          lineDash: [2, 2],
          
        },
      },
      {
        colorField: 'type', // or seriesField in some cases
        color: ({ type }) => {
          if(type === 'male'){
            return 'red';
          }
          return 'yellow';
        }
      }
    ],
  };

  return (
    <div>
      <Line {...config} />
    </div>
    
  );
};
