import React, { Component } from 'react'

import {  Form, Input, Button, Select, DatePicker, Tooltip, Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

//servicio
import userService from '../../servicios/informacionDeUsuarioService'


const { Option } = Select; 



const layout = {
    labelCol: {
      span: 8,
      
    },
    wrapperCol: {
      span: 9,
    },
    
  };
  const tailLayout = {
    wrapperCol: {
      offset: 7,
      span: 6,
      
    },
    
  };


  const options = [
    {
        value: 'hombre',
        label: 'MASCULINO',
      
    },
    {
        value: 'mujer',
        label: 'FEMENINO',
    },
    {
        value: 'otro',
        label: 'OTRO',
    },
  ];


  const saveUser = async (datos) => {
    console.log(datos)
    let res = await userService.registrarUsuario(datos)
    console.log(res);
    //setproducts(res);
  }

export default class SignUp extends Component {
    
    render() {
        let genre = "";
        let fech = "";
        const SignUp = () => {
            const onFinish = values => {
              
              //.log('Success:', values);
              let objectFinal = {
                  name: values.name,
                  surname: values.surname,
                  dni: values.dni,
                  direccion: values.direccion,
                  genero: genre,
                  email: values.email,
                  password: values.password,
                  password2: values.password2,
                  fechaNac: fech,
                  nombreUser: values.username

              }
              if(objectFinal.password===objectFinal.password2){
                  console.log("son iguales, insertar en bd");
                  saveUser(objectFinal)
                  console.log('ok')
              }
              else{
                  onFinishFailed('Las contraseñas no son iguales')
                  //console.log('dar mensaje de que deben ser iguales')
              }
              
              
            };
          
            const onFinishFailed = errorInfo => {
              console.log('Failed:', errorInfo);
            };
        return (
            <Card title="Completa tu Información"  style={{ width: 700, marginTop:'2%', marginLeft:340, textAlign:"center" }}>
            <Form
                
                {...layout}
                name="basic"
                
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h1 style={{textAlign:"center"}}> Control de Huertas Remoto</h1>
                <h2 style={{textAlign:"center"}}> Registro de Usuario</h2>
                <Form.Item
                    style={{  paddingTop: 30 }}
                    label="Nombre"
                    name="name"
                    rules={[
                        {
                            type:'string',
                            required: true,
                            message: '¡Debe ingresar un nombre!',
                            transform:String
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    
                    label="Apellido"
                    name="surname"
                    rules={[
                        {
                            type:'string',
                            required: true,
                            message: '¡Debe ingresar un apellido!',
                            transform:String
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    
                    label="DNI"
                    name="dni"
                    rules={[
                        {
                            type:"number",
                            required: true,
                            message: '¡Debe ingresar un dni valido sin puntos o comas!',
                            transform:Number
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    
                    label="Direccion"
                    name="direccion"
                    rules={[
                        {
                            
                            required: true,
                            message: '¡Debe ingresar una dirección!',
                            
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item                  
                    label="Sexo"
                    rules={[{required:true}]}
                > 
                    
                    <Input.Group compact>
                        <Select defaultValue="Seleccione un género" 
                        style={{width:'100%'}} 
                        name='sex'
                        
                        onChange={(value) => {
                            genre = value;
                            console.log(value)
                          }} 
                        > 
                            <Option value="Hombre">Masculino</Option>
                            <Option value="Mujer">Femenino</Option>
                            <Option value="Otro">Otro</Option>
                        </Select>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    
                    label="Fecha de Nacimiento"
                    rules={[{required:true, message:'un mensaje'}]}
                    
                >
                    <Input.Group compact >
                        <DatePicker 
                        style={{ width: '100%' }} 
                        onSelect={(value) => {
                            fech = value.format('DD-MM-YYYY')
                          }} />
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    name="username"
                    label={
                        <span>
                            Nombre de Usuario&nbsp;
                                <Tooltip title="¿Cómo quieres que otros te llamen?">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, ingrese un nombre de usuario',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type:"email",
                            required: true,
                            message: '¡Debe ingresar un email valido!',


                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '¡Debe ingresar una contraseña!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Repetir Contraseña"
                    name="password2"
                    rules={[
                        {
                            
                            required: true,
                            message: '¡Debe repetir la contraseña!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Registrarse
                    </Button>
                </Form.Item>
            </Form>
            </Card>
        )
      }
      return(
        SignUp()
      )
          
      
    }
}
