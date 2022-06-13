import React, { useState, useEffect } from 'react';
import NodoService from '../../servicios/informacionDeNodoService';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { users } from '../../redux/_reducers/users.reducer';

export const GraficoNodoTemperatura = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {


      console.log(props)
      let param = {email: props.email, nombre: props.nombre}
      NodoService.getNodoPorNombre(param).then((resp)=>{
        console.log(resp)
        const datos = []
        
        resp.forEach((element, index) => {
          const infoNodo = {
            Fecha:"",
            Temperatura:""
          } 
          infoNodo.Fecha = new Date(element.fechaAlta).toLocaleString('es-AR')//(element.fechaAlta).toLocaleString('es-AR');
          infoNodo.Temperatura = Math.floor(element.conexiones[0].valor);
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
    yField: 'Temperatura',
    annotations: [
      // 低于中位数颜色变化 alguna cosa en chino
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#d60404',
        
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: 'Alerta de temperatura baja',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
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

//ReactDOM.render(<GraficoNodo />, document.getElementById('container'));