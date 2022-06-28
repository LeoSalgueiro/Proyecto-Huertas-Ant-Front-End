import React, {useEffect, useState} from "react"
import { WeatherBit } from '../weather/WeatherBit'
import Card from "antd/lib/card/Card"
import { Divider, Alert, Table } from 'antd';
import NodoService from '../../servicios/informacionDeNodoService'



const columnas = [
    {
        title:'Nombre',
        dataIndex:'nombre',
        key:'nombre',
        align:'center',
        
    },
    {
        title:'Temperatura Ambiente',
        dataIndex:'temperatura',
        key:'temperatura',
        align:'center'
    },
    {
        title:'Humedad Ambiente',
        dataIndex:'humedadAmbiente',
        key:'humedadAmbiente',
        align:'center'
    },
    {
        title:'Humedad Suelo',
        dataIndex:'humedadSuelo',
        key:'humedadSuelo',
        align:'center'
    },
]

const columnaParametros = [
    {
        title:'Parámetros',
        dataIndex:'nombreParam',
        key:'nombreParam',
        align:'center'
    },
    {
        title:'Temperatura',
        dataIndex: 'temperatura',
        key:'temperatura',
        align:'center'
    },
    {
        title:'Humedad Ambiente',
        dataIndex: 'humedadAmbiente',
        key:'humedadAmbiente',
        align:'center'
    },
    {
        title:'Humedad Suelo',
        dataIndex: 'humedadSuelo',
        key:'humedadSuelo',
        align:'center'
    },
]

let parametros =[
    {
        key:1,
        nombreParam:'Mínimo',
        temperatura:'18°C',
        humedadAmbiente:'60%',
        humedadSuelo:'300'
    },
    {
        key:1,
        nombreParam:'Máximo',
        temperatura:'27°C',
        humedadAmbiente:'80%',
        humedadSuelo:'600'
    }
]


let data = [
    {
        key:1,
        nombre:'nodo1',
        temperatura:'10',
        humedadAmbiente:100,
        humedadSuelo:100
    }
]


export function PantallaPrincipal  (props) { 

    //state = { items:[], isLoaded:false, data:''||{}};  
    const [datosActuales, setDatosActuales] = useState([''])  
    
    const email = sessionStorage.getItem('email');


    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    useEffect(() => {


        NodoService.getConfigNodos({ email: props.email || email })
            .then((result) => {
                const nombres = [];
                const listaDatosActuales = [];
                
                result.forEach(nodo => {
                    nombres.push(nodo.nombre)
                    NodoService.getUltimaInformacionDeNodos({email: email, nombre: nodo.nombre}).then((ultimaInfo)=>{
                        
                        const nodoConSensores = []
                        nodoConSensores.push(ultimaInfo[0].nombre)
                        
                        ultimaInfo[0].conexiones.forEach(sensor =>{
                            const sensorArray = []
                            sensorArray.push(sensor.nombre)
                            sensorArray.push(sensor.valor)
                            nodoConSensores.push(sensorArray)
                        })
                        
                        listaDatosActuales.push(nodoConSensores)
                        
                       
                    }).then(()=>{
                        
                        setDatosActuales(listaDatosActuales)
                        const listaDatos = []
                        listaDatosActuales.forEach((res,index)=>{
                            console.log(res[1][1])
                            listaDatos.push({key:index,nombre:res[0],temperatura:res[1][1],humedadAmbiente:res[3][1],humedadSuelo:res[2][1]})
                            data = listaDatos
                        })

                        forceUpdate();
                        console.log(data)
                        
                        //data = listaDatos

                        

                    })
                });
                
                sessionStorage.setItem('listaNodos',nombres)
                
                

            }, (error) => {
                console.log('entra a errror de la lista')
                
            }
            )
            
    }, []);

    const crearData = (datos) =>{
        //console.log(datosActuales)
    }

    return(
        <div style={{ textAlign: 'center' }}>
            <Alert
                message="Información"
                description="Para utilizar el sistema, seleccione una de las opciones disponibles en el menú de la izquierda"
                type="info"
                closeText="Cerrar"
                showIcon
            />
            
            <div style={{float: 'left', width:'50%', padding:'3%'}}>
               
                <Divider plain>Estado actual de nodos</Divider>
                <p>{crearData}</p>
                <div style={{height: '100%', width:'100%'}}>
                    <Card style={{ boxShadow: "1px 2px 2px 2px rgba(184, 184, 184, 0.6)", borderRadius: '4px', height:'51vh' }}>
                        <Table expandable={true} columns={columnas} dataSource={data} tableLayout={"fixed"}  pagination={false} ></Table>
                        <Divider></Divider>
                        <Table columns={columnaParametros} dataSource={parametros} tableLayout={"fixed"} pagination={false} ></Table>
                    </Card>
                </div>
            </div>
            <div style={{float: 'left', width:'50%', padding:'3%'}}>
                <Divider plain>Temporal actual</Divider>
                <WeatherBit style={{width:'100%'}}>
                </WeatherBit>
            </div>
            
        </div>
    )
}