import React from 'react'

import nodoService from '../../servicios/informacionDeNodoService'


import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Tag
  } from 'antd';

  
  
  const options = [
    { value: 'Temperatura Ambiente' }, 
    { value: 'Humedad de Suelo' }, 
    { value: 'Intensidad Lumínica' }, 
    { value: 'Humedad Ambiente' },
    { value: 'Módulo NRF24L01'},
    { value: 'Módulo WIFI(ESP 8266 MOD)'}
  
  ];

  function tagRender(props) {
    const { label, closable, onClose } = props;
  
    return (
      
      <Tag color={'green'} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }
  
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 8 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  export default function RegistrationForm () {
    const [form] = Form.useForm();
    let fech = '';
    let conexiones = '';
    
    const onFinish = values => {
      let objectFinal = {
        nombre: values.nombre,
        tipo: values.tipo,
        conexiones: conexiones,
        email: values.email,
        descripcion: values.descripcion,
        fechaAlta: fech,
      }
      
      nodoService.registrarNodo(objectFinal)
      console.log(objectFinal)
      
    };
  
 
  
    return (
      <Form
      
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        
  
        <Form.Item
          name="nombre"
          label="Nombre de Nodo"
          rules={[
            {
              required: true,
              message: 'El nodo debe tener un nombre que lo identifique',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
  
        
  
  
        
  
        <Form.Item
          name="tipo"
          label="Tipo"
          rules={[{ required: true, message: 'Ingrese el tipo de nodo (Mega, Uno, Etc.)' }]}
        >
          <Input tyle={{ width: '100%' }} />
        </Form.Item>
  
        <Form.Item
          name="conexiones"
          label="Conexiones que posee"
          
        >
         
         <Select 
               //data={this.state.conexiones}
                mode="multiple"
                tagRender={tagRender}
                style={{ width: '100%' }}
                options={options}
               
                onChange={(value) => {
                  
                  conexiones = value;
                  //this.handleChange(this.res)
                
                }}
            />
        
          
        </Form.Item>
  
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
       

        <Form.Item
          name="descripcion"
          label="Descripción"
          
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="fecha"
          label="Fecha de Alta"
          
          
        >
          <Input.Group compact>
          <DatePicker       
          onSelect={(value) => {
            
            fech = value.format('DD-MM-YYYY')
          }}
          
          />
          </Input.Group>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Registrar Nodo
          </Button>
        </Form.Item>
      </Form>
    );

    
  };


  