
import React, {useEffect, useState} from "react";
import { GraficoNodoHumedadAmbiente } from "../estadoNodos/GraficoNodoHumedadAmbiente";
import { GraficoNodoHumedadSuelo } from "../estadoNodos/GraficoNodoHumedadSuelo";
import { GraficoNodoTemperatura } from "../estadoNodos/GraficoNodoTemperatura";
import informacionDeNodoService from "../../servicios/informacionDeNodoService";

import { Select, Alert } from "antd";
const {Option} = Select;

export const PantallaEstadodENodos = (props) => { 
    const [opciones, setOpciones] = useState(['']);
    const [opciones2, setOpciones2] = useState(['']);
    const [nombreSeleccionado, setNombreSeleccionado] = useState('');
    const [sensorSeleccionado, setSensorSeleccionado] = useState('');


    
    useEffect(() => { 
        const opcio = sessionStorage.getItem('listaNodos').split(',');
        //console.log(opcio)
        setOpciones(opcio)
        
    },[]);


    const handleChange1 = (value) => {
        setNombreSeleccionado(value)
        
        
        setSensorSeleccionado('')
        let result = informacionDeNodoService.getConfigUnNodo({email:props.email, nombreNodo:value})
        .then((res)=>{
            console.log(res)
            setOpciones2(res.topics)
            
        })
      
      };

      const handleChange2 = (value) => {
        //setSeleccionado(value)
        console.log(value)
        if(value === "temperatura"){
            setSensorSeleccionado(<GraficoNodoTemperatura email={sessionStorage.getItem('email')} nombre={nombreSeleccionado}></GraficoNodoTemperatura>)
        }
        if(value === 'humedadSuelo'){
            setSensorSeleccionado(<GraficoNodoHumedadSuelo email={sessionStorage.getItem('email')} nombre={nombreSeleccionado}></GraficoNodoHumedadSuelo>)
        }
        if(value === 'humedadAmbiente'){
            setSensorSeleccionado(<GraficoNodoHumedadAmbiente email={sessionStorage.getItem('email')} nombre={nombreSeleccionado}></GraficoNodoHumedadAmbiente>)
        }
        /*
        let result = informacionDeNodoService.getConfigUnNodo({email:props.email, nombreNodo:value})
        .then((res)=>{
            console.log(res)
            setOpciones2(res.topics)
        })
        */
       
      };

    return(
        <div>
            <Alert
                message="Información"
                description="Seleccione el nodo que desea ver y a continuacion seleccione su respectivo sensor"
                type="info"
                closeText="Cerrar"
                showIcon
            />
            <div style={{border:3,float:'left', marginRight:'2%', marginTop:'2%'}}>

            
           
                < Select

                    style={{ width: 170 }}
                    onChange={handleChange1}
                    defaultValue="Seleccione un nodo"
                    className="browser-default custom-select" >

                    {
                    opciones.map(item => (
                        <Option key={item} value={item} label={item}>
                                {item}
                        </Option>
                    ))}

                </Select >
            
            </div>
            <div style={{ marginLeft:'2%', marginTop:'2%'}}>
            
                < Select

                    style={{ width: 170 }}
                    onChange={handleChange2}
                    defaultValue="Seleccione un sensor"
                    className="browser-default custom-select" >

                    {
                    opciones2.map(item => (
                        <Option key={item} value={item} label={item}>
                                {item}
                        </Option>
                    ))}

                </Select >
            

            
            </div>
            <div style={{marginTop:'5%'}}>
                {sensorSeleccionado}
            </div>
        </div>
    );

}