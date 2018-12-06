import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import sha256 from 'crypto-js/sha256';
import PropTypes from "prop-types";
var CryptoJS = require("crypto-js");
import {Usuarios} from '../../api/usuarios.js';

class IniciarSesion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correo: "",
      clave:"",
      nickname:"",
    };
    this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
    this.handleChangeClave=this.handleChangeClave.bind(this);
    this.listo=this.listo.bind(this);
    this.atras=this.atras.bind(this);
  }

 atras(){
    this.props.atras(true);
  }
handleChangeCorreo(event){
  this.setState({correo: event.target.value});
}
handleChangeClave(event){
  this.setState({clave: event.target.value});
}


listo(){
  let {
    correo,
    clave,
  }=this.state;
  if(correo===""){
    alert("Se requiere el correo");
  }
  else if(clave===""){
    alert("Se requiere clave");
  }
  else {
  // Juan Vega: Para facilitar el proceso de autenticacion e inicio de sesion hubieran posido usar el método Meteor.loginWithPassword()
    //De esta forma, hubieran podido aprovechar el manejo de cuentas de Meteor evitando la implementación manual.
    //A continuación, les pongo un ejemplo:
    
    Meteor.loginWithPassword(correo, clave, (e) => {
      if (e) {
        console.log('[ERROR] No se realiza el login: ' + e.reason);
        
      }
      else {
         console.log('Login exitoso');
       
      }
    });
    
    let sk=Meteor.settings.public.stripe.p_key;
    const ciphertext = CryptoJS.AES.encrypt(clave, sk).toString();
    var bytes  = CryptoJS.AES.decrypt(ciphertext, sk);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    const uLoged = Meteor.call("usuarios.getUser",correo, (err, use)=>{
      if(use){
      var bytes  = CryptoJS.AES.decrypt(use.claveHash, sk);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if(originalText===clave){
        this.loged(correo,use.nickname, use.id);
        let datos = new Object();
        datos.correo=correo;
        datos.nickname=use.nickname;
        datos.id=use.id;
        localStorage.setItem("sesion", JSON.stringify(datos));
      }
      else{
        alert("Credenciales Invalidas");
      }
      }
      else{
        alert("Credenciales Invalidas");
      }
    });

  }
}
loged(correo, nickname, id1){
  this.props.loged(true,correo,nickname, id1);
}

  render() {
    const divStyle = {
    width: "35%",
    margin: "auto",
      borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "20px",
    borderColor: "#041527",
     boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};
const w = {
  width: "80%",
  margin: "auto",

}
let {
  correo,
  clave,
}=this.state;
    return (
      <div style={divStyle} aria-label="Formulario para iniciar sesion">
<div style={w}>
      <br/>
        <form>
          <br/>
          <div className="form-group">
            <label htmlFor="correo" className="letra">Correo: </label>
            <input aria-required="true" type="text" className="form-control" id="correo" placeholder="correo@correo.com"value={correo} onChange={this.handleChangeCorreo}/>
          </div>
          <div className="form-group">
            <label htmlFor="clave" className="letra">Contraseña: </label>
            <input aria-required="true" type="password" className="form-control" id="clave" placeholder="Contraseña" value={clave} onChange={this.handleChangeClave}/>
          </div>
        </form>
        <br/>
        <div className="btnFor">
        <button type="button" className="btnLis" onClick={this.listo}>Entrar</button>
         <span> </span>
        <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
        <span> </span>
        </div>
      </div>
      <br/>
      </div>
    );
  }
}
IniciarSesion.propTypes = {
  usuario:PropTypes.object,
};

export default withTracker(() => {
  Meteor.subscribe("usuarios");

  return {
    usuarios:Usuarios.find({}).fetch(),
  };
})(IniciarSesion);
