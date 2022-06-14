import React from 'react'

//redux

import { userService } from '../../redux/_services/index'

//contenido
import {EstadoNodos} from '../contenido/EstadoNodos'
import ListaNodos from '../contenido/ListaNodos'
import NodoLog from '../contenido/RegistroNodo'
import Perfil from '../contenido/Perfil'
import { PantallaPrincipal } from '../contenido/PantallaPrincipal'

import { Layout, Menu, Breadcrumb, Empty } from 'antd';
import {
  OrderedListOutlined,
  DashboardOutlined,
  ImportOutlined,
  SettingOutlined,
  UserOutlined,
  SmileOutlined,
  PlusCircleOutlined,
  RobotOutlined,
  HomeOutlined,
  CloudOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';

import ReactWeather, { useOpenWeather } from 'react-open-weather'
import { WeatherBit } from '../weather/WeatherBit'
import { PantallaEstadodENodos } from '../estadoNodos/PantallaEstadoDeNodos'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


//importo la lista de nodos

const blank = {
  color: '#dbdbdb'
}

//variables de contenido dinamico
let variable = <PantallaPrincipal email={sessionStorage.getItem('email')}></PantallaPrincipal>
let TituloContenido = <h2 style={blank}>Control Remoto de Huertas</h2>

//para weather bit


export default class SiderDemo extends React.Component {


  constructor(props) {
    super(props);

    
  }


  state = {
    collapsed: true,
    key: '1'
  };

  styles = {
    backgroundColor: '#2a1215',
    textColor: '#fac8c3',

  }

  onCambio = (data) => {
    variable = <PantallaEstadodENodos email={sessionStorage.getItem('email')} ></PantallaEstadodENodos>
  }

  //dependiendo del cambio de estado va a cargar diferente informacion
  onClickEstado = (event) => {
    console.log(event.key)
    switch (event.key) {
      case '1':
        this.setState({ key: '1' })
        TituloContenido = <h2 style={blank}>Lista de Nodos</h2>
        variable = <ListaNodos email={sessionStorage.getItem('email')} control={this.onCambio} ></ListaNodos>
        break;
      case '2':
        this.setState({ key: '2' })
        TituloContenido = <h2 style={blank}>Estado de Nodos</h2>
        variable = <PantallaEstadodENodos email={sessionStorage.getItem('email')} ></PantallaEstadodENodos>//<EstadoNodos></EstadoNodos> 
        break;
      case '3':
        this.setState({ key: '3' })
        TituloContenido = <h2 style={blank}>Perfil de Usuario</h2>
        variable = <Perfil></Perfil>
        break;
      case '4':
        this.setState({ key: '4' })
        TituloContenido = <h2 style={blank}>Registro de Nodo</h2>
        variable = <NodoLog></NodoLog>
        break;
      case '5':
        this.setState({ key: '5' })
        TituloContenido = <h2 style={blank}>Configuración del Sistema</h2>
        variable = <div>
          
          <Empty 
            image="https://svgsilh.com/svg/147296.svg"
            imageStyle={{
              height: 130,
              color:'#ffffff'
            }}
            description={
              <span>
                Pagina En Construcción
            </span>
            } />
        </div>
        break;
      case '6':
        this.setState({ key: '6' })
        variable = userService.logout()

        break;
      case 'def':
        this.setState({key: 'def'})
        TituloContenido = <h2 style={blank}>Control Remoto de Huertas</h2>
        variable = <PantallaPrincipal email={sessionStorage.getItem('email')}></PantallaPrincipal>
        break;
      default:
        variable = <div><h2>Seleccione una opción en la barra lateral de navegación para informarse</h2></div>;
        break;
    }

  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };




  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="site-layout-background" style={{ padding: 0, textAlign: "center", color: '#F5F5F5', fontSize: 18 }} title="Control Remoto de Huertas" >{TituloContenido}  </Header>
        <Layout>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onClickEstado}>

              <Menu.Item key="def" icon={<HomeOutlined />} title="Inicio">Inicio</Menu.Item>
              
              <SubMenu key="sub1" icon={<NodeIndexOutlined />} title="Nodos">
                <Menu.Item key="1" icon={<OrderedListOutlined />}  >Lista de Nodos</Menu.Item>
                <Menu.Item key="2" icon={<DashboardOutlined />} >Estado de Nodos</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<CloudOutlined/>} title="Tiempo">
                <Menu.Item key="Tiempo" icon={<CloudOutlined/>} title="hoy">Tiempo hoy</Menu.Item>
              </SubMenu>

              <SubMenu key="sub3" icon={<UserOutlined />} title="Usuario">
                <Menu.Item key="3" icon={<SmileOutlined />}>Perfil</Menu.Item>
              </SubMenu>
              
              <SubMenu key="sub4" icon={<SettingOutlined />} title="Configuración del sistema">
                <Menu.Item key="4" icon={<PlusCircleOutlined />}>Registrar Nuevo Nodo</Menu.Item>
                <Menu.Item key="5" icon={<RobotOutlined />}>Configuración general</Menu.Item>
              </SubMenu>
              <Menu.Item key="6" icon={<ImportOutlined />} >Salir</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>LeNaUnaj</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {variable}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Control Remoto de Huertas ©2022 Created by LeNa UNAJ</Footer>
          </Layout>
        </Layout>
        

      
      </Layout>
    )


  }
}
