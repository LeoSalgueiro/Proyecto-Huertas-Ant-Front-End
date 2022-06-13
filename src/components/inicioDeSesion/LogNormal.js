import React, { Component } from 'react'

import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';

import { userActions } from '../../redux/_actions';

//servicio
import userService from '../../servicios/informacionDeUsuarioService'

//ruta privada
import principal from '../menu/menuOcultable'


const autenticar = async (values) => {
  let res = await userService.login(values)
  
  console.log(res);
  //setproducts(res);
} 




const NormalLoginForm = (props, state) => {
  const onFinish =  values => {
    //getUser(values)
    //this.setState({ submitted: true });
   // const { username, password } = [values.username, values.password];
    
        if (values.username && values.password) {
          let resp = props.login(values.username, values.password)
          
        }
    
  
    console.log('Received values of form: ', values);
    
  };

  return (
     
    <Card title="Control de Huertas Remoto"  style={{ width: 400, marginTop:'7%', marginLeft:40, textAlign:"center" }}>
        <p style={{textAlign:"center", fontSize:24}}>Inicio de Sesión</p>
    <Form
      style={{width:320, alignContent:"center", paddingLeft:20, textAlign:'center'}}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Debes ingresar un email' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Debes ingresar una contraseña' }]} 
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          ¿Olvidaste la contraseña?
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight:15}}>
          Iniciar Sesión
        </Button>
         O <a href="/register" style={{marginLeft:15}}>¡Registrate Ahora!</a>
      </Form.Item>
    </Form>
    </Card>


  );
};




class LogNormal extends Component {

  //INICIO PRUEBAAAAAAAA
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
        username: '',
        password: '',
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password } = this.state;
  if (username && password) {
      this.props.login(username, password);
  }
}


//FIN PRUEBAAAAAAA

    render() {
      const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            NormalLoginForm(this.props, this.state)
/*
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
            */
        )
    }
}



//funciones 
function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LogNormal);
export { connectedLoginPage as LogNormal };