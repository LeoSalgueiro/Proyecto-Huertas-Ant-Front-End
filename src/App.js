import React from 'react';
import './App.css';
import "antd/dist/antd.css";


//impotes nuevos
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './redux/_helpers';
import { alertActions } from './redux/_actions';
import { PrivateRoute } from './redux/_components';
import Menu from "./components/menu/menuOcultable";//import { HomePage } from '../HomePage';
import { LogNormal } from './components/inicioDeSesion/LogNormal';//import { LoginPage } from '../LoginPage';
import Sign from './components/inicioDeSesion/SignUp'//import { RegisterPage } from '../RegisterPage';
import { Divider } from 'antd';
//fin importes nuevos

//import Recovery from './components/inicioDeSesion/LogNormal'//este tengo que crear el recuperar contra

//ruteo
/*
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
*/
const sectionStyle = {
  height: "100vh",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${'https://pastoralsj.org/images/huerto.jpg'})`,
  src: 'https://pastoralsj.org/images/huerto.jpg',
  alt: 'una imagen',

}

const sectionStyle2 = {
  height: "135vh",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${'https://www.jardineriaon.com/wp-content/uploads/2015/03/huerto-1024x768.jpg'})`,
  src: 'https://www.jardineriaon.com/wp-content/uploads/2015/03/huerto-1024x768.jpg',
  alt: 'una imagen 2',
  curpos:0, //scroll al principio de la pagina
  

}
/*
<div >
      <header style={{backgroundColor:'#F7F7F7', textAlign:'center', font:'verdana'}}><h1>Control de Huertas Remoto</h1></header>
    </div >
*/
/*
function App() {
  return (
    <Router>
        <div>
        <Switch>
          <Route exact path="/login">
            <div style={sectionStyle}>
              <div >
                <header style={{ textAlign:'center', font:'verdana'}}><Divider style={{marginTop:0, borderTop:0}}/></header>
              </div >
                <LogNormal />
            </div>
          </Route>
          <Route exact path="/recoveryPassword">
            
          </Route>
          <Route exact path="/registrarse">
            <Sign/>
          </Route>
          <Route exact path="/index">
            <Menu/> 
          </Route>
          
        </Switch>
      </div>
    </Router>
      

      //7777
    <div style={sectionStyle}>
      <div >
      <header style={{ textAlign:'center', font:'verdana'}}><Divider style={{marginTop:0, borderTop:0}}></Divider></header>
    </div >
    <Log></Log>
    </div>
    ///77
  );
}
*/
class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div >

        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/index" component={Menu} />
            <Route path="/login" component={LogNormal} >
            <div style={sectionStyle}>
              <div >
                <header style={{ textAlign:'center', font:'verdana'}}><Divider style={{marginTop:0, borderTop:0}}/></header>
              </div >
                <LogNormal />
            </div>
            </Route>
            <Route path="/register" component={Sign} >

            <div style={sectionStyle2}>
              <div >
                <header style={{ textAlign:'center', font:'verdana'}}><Divider style={{marginTop:0, borderTop:0}}/></header>
              </div >
              <Sign/>
            </div>
            </Route>
            <Redirect from="*" to="/login" />
          </Switch>
        </Router>

      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

/*
<div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </div>
*/

export default App;
