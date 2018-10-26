import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Registro from './sesionusuario/Registro.js';
import SolicitudA from './ayuda/SolicitudA.js';
import IniciarSesion from './sesionusuario/IniciarSesion.js';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registro: false,
      login: false,
      loggeado:false,
      correo:"",
      nickname:"",
      solicitarAyuda:false,
    };
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.registrarse = this.registrarse.bind(this);
    this.loged = this.loged.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.solicitarAyuda = this.solicitarAyuda.bind(this);
  }
  solicitarAyuda(){
    this.setState({
      solicitarAyuda:true
    });
  }
cerrarSesion(){
  this.setState({registro:false,login:false,loggeado:false,correo:"",nickname:""});
}
registrarse()
{
  this.setState({registro:true});
}
iniciarSesion()
{
  this.setState({login:true});
}

renderBtnSesion()
{
  if(this.state.registro==false && this.state.login==false){
      return(
        <div>
        <button type="button" className="btnReg" onClick={this.registrarse}>Registrarse</button>
        <span> </span>
        <button type="button" className="btnReg" onClick={this.iniciarSesion}>Iniciar Sesion</button>
        <span> </span>
        </div>

      );
  }
  else if(this.state.loggeado) {
    return (
  <div>
    <h3>{this.state.nickname}</h3>
    <button type="button" className="btnOut" onClick={this.cerrarSesion}>Cerrar Sesion</button>
  </div>

    );
  }
  else {
    return null;
  }
}

//
loged(bol,correo,nickname){
  this.setState({loggeado:true, correo:correo, nickname:nickname});
}
showContent()
{
  if(Meteor.user())
  {
    return(
      <div>
        <h3>Registrado</h3>
      </div>
        );
  }
  else
  {
    let registro = this.state.registro;
    let login = this.state.login;
    let loggeado = this.state.loggeado;
    let nickname = this.state.nickname;
    if(registro &&!loggeado)
    {
      return(
        <div>
          <br/>
          <br/>
          <Registro loged={this.loged}/>
          <br/>
          <br/>
        </div>);
    }
    else if(login &&!loggeado){
      return(
        <div>
        <br/>
        <br/>
        <IniciarSesion loged={this.loged}/>
          <br/>
          <br/>
        </div>
      );
    }
    else if (loggeado){
      return(
        <div>
        <br/>
        <br/>
        <SolicitudA nickname={nickname}/>
        <br/>
        </div>
      );
    }
    else{
      return(
        <div>
          <button type="button" className="btnNormal" onClick={this.solicitarAyuda}>Nueva Solicitud de Ayuda</button>
          <div className="carrusel">
            <br/>
            <br/>
            <br/>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                  <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true} width={"800px"}>
                    <div>
                      <img src="/1.jpg" />
                    </div>
                    <div>
                      <img src="/2.jpg"></img>
                    </div>
                    <div>
                      <img src="/3.jpg"></img>
                    </div>
                  </Carousel>
                  </td>
                  <td>
                    <h3>
                    ¿Necesitas ayuda? <br/>Estás en el lugar indicado <br/><br/>
                    ¿Te gusta ayudar? <br/>También acá puedes hacerlo y hasta recibir una remuneración
                    por ello<br/><br/><br/>
                    Regístrate y únete al progreso porque todos necesitamos la ayuda de alguien
                    y todos podemos cooperar en algo
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

  );
    }
  }

}

  render() {
    return (
      <div>
           <nav className="barra">
               <a> <img className="q" src="/q.png" alt="help buddy icon"/> Help Buddy </a>
                 <div className="useri">
                     {this.renderBtnSesion()}
                 </div>
           </nav>
           <br />
           <br />
           <br />
        <div className = "App">
          <div className="container">
          <br/>

          {this.showContent()}

          </div>
        </div>
      </div>
    );
  }
}


App.propTypes = {

};

export default withTracker(() => {

  return {
  };
})(App);
