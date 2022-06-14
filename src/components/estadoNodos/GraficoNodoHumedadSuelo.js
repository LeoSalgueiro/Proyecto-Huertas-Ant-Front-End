import React, { useState, useEffect } from 'react';
import NodoService from '../../servicios/informacionDeNodoService';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';


export const GraficoNodoHumedadSuelo = (props) => {
  const [data, setData] = useState([]);
  //const [seleccionado, setSeleccion] = useState(["Temperatura Ambiente", "Humedad de Suelo", "Humedad Ambiente"]);
 // const [seleccion, setSelec] = useState('');
  //const [tipo, setTipo] = useState(['Temperatura'])


//  const opciones = seleccionado.map(Add => Add)
/*
  const handleSeleccionChange = (e) => {
    //hacer lo que haya que hacer
    console.clear();
    console.log((seleccionado[e.target.value]));
    setSelec(seleccionado[e.target.value])

  }
  
*/

  useEffect(() => {
   // const valorSeleccionado = seleccion


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
          infoNodo.Humedad = Math.floor(element.conexiones[1].valor);
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
    min:0,
    max:2000,
    annotations: [
      // 低于中位数颜色变化 alguna cosa en chino
      //region para maximo
      {
        type: 'regionFilter',
        start: ['min', 600],
        end: ['max', 1300],
        color: '#d60404',
        
      },
      {
        type: 'line',
        start: ['min', 600],
        end: ['max', 600],
        style: {
          stroke: '#f44a4a',
          lineDash: [2, 2],
          
        },
      },
      //region para minimo
      {
        type: 'regionFilter',
        start: ['min', 300],
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
        start: ['min', 300],
        end: ['max', 300],
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
