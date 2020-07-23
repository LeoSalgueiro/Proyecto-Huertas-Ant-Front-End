import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  Upload,
  DatePicker,
  InputNumber
} from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;


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

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

export default function RegistrationForm  () {
  const [form] = Form.useForm();

  let fech = '';

  const onFinish = values => {

    let objectFinal = {
      foto:values.upload,
      user:values.username,
      nombre: values.nombre,
      apellido: values.apellido,
      dni: values.dni,
      direccion: values.direccion,
      fechaDeNac: fech,
      email: values.email,
      contraseñaNueva: values.confirm,
      
    }

    console.log(objectFinal);
  };





  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
        <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="La imagen no puede pesar mas de 5MB"
      >
        <Upload name="logo" action="#" listType="picture">
          <Button>
            <UploadOutlined /> Cargar Foto de Perfil
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="username"
        label={
          <span>
            Nombre de Usuario&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[
          {
            
            message: 'Debe ingresar un nombre válido',
          },
          {
            required: true,
            message: '¡Este campo no puede quedar vacío, ingrese un nombre válido!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="apellido"
        label="Apellido"
        rules={[
          {
            
            message: 'Debe ingresar un apellido válido',
          },
          {
            required: true,
            message: '¡Este campo no puede quedar vacío, ingrese un apellido válido!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="dni"
        label="DNI"
        rules={[
          {
            type:'number',
            message: 'Debe ingresar un dni válido',
            transform:Number
          },
          {
            required: true,
            message: '¡Este campo no puede quedar vacío, ingrese un dni válido sin puntos ni comas!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="direccion"
        label="Dirección"
        rules={[
          {
            
            message: 'Debe ingresar una dirección válida',
          },
          {
            required: true,
            message: '¡Este campo no puede quedar vacío, ingrese una dirección válida!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Fecha de Nacimiento">
        <Input.Group>
        <DatePicker onSelect={(value) => {
            
            fech = value.format('DD-MM-YYYY')
          }}/>
          </Input.Group>
    </Form.Item>

   

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type:'email',
            message: 'Debe ingresar un email válido',
          },
          {
            required: true,
            message: '¡Este campo no puede quedar vacío, ingrese un email válido!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="contra"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: '¡Por favor, ingrese una contraseña!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Repetir Contraseña"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '¡Por Favor, repita la contraseña!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('contra') === value) {
                return Promise.resolve();
              }

              return Promise.reject('Las contraseñas son diferentes');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      
    
      

      

      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};



    

