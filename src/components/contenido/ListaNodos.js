import React from 'react'

import { List, Avatar, Button } from 'antd';
import nodoService from '../../servicios/informacionDeNodoService'
import { render } from '@testing-library/react';
import Perfil from '../contenido/Perfil'


const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    href: '#',
    title: `Nodo Nro ${i}`,
    avatar: 'https://giantbomb1.cbsistatic.com/uploads/scale_small/10/103881/2919909-josh.jpeg',
    description:
      'insertar la descripcion traida de cada nodo de la bd',
    content:
      'Content: aca veré que poner luego. En titulo estoy poniendo por index el nro, quizas la bd ya me de eso',
  });
  
}

const imagenes = {
  mega: 'https://www.nova.com.bo/37-large_default/arduino-mega-2560-r3.jpg',
  uno: 'https://www.brunoloyola.com.br/wp-content/uploads/2018/10/ARDUINO_UNO_DIP_01.png',
  avatar: 'https://e7.pngegg.com/pngimages/112/156/png-clipart-kodi-user-profile-android-tv-installation-add-on-random-icons-miscellaneous-television.png',
  wemos: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN8lfxWlkLzZ1Ck1r9Xq9qlVp0vlltb03PTA&usqp=CAU'
}
export default class ListaNodos extends React.Component{


  state = { items:[], isLoaded:false, data:''||{}};

  constructor(props){
    super(props);

    this.state = {
      error:null,
      isLoaded:false,
      items:[],
      

    };

    
  }


  
  
 
  componentDidMount(){
    nodoService.getConfigNodos({email:this.props.email})
    .then(res => res)
    .then((result) => {
      console.log('entro al result de la lista')
      
      this.setState({isLoaded:true, items:result})
      
    },(error) => {
      console.log('entra a errror de la lista')
      this.setState({
        isLoaded: true,
        error 
      });
    }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={items}
        
          renderItem={item => (

            <List.Item
              
              key={item.nombre}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={(item.tipo==='Wemos D1')?imagenes.wemos : imagenes.uno}
                />
              }

            >
              <List.Item.Meta
                avatar={<Avatar src={imagenes.avatar} />}
                title={<p>Nombre: {item.nombre}</p>}
                description={item.tipo}
              />
              {item.descripcion}
             
            </List.Item>


          )}
        />
      )
    }
  }
    

}