import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";

export default class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      correo: "",
      nickName:"",
      clave:"",
      repetirClave:""
    };
    this.handleChangeName=this.handleChangeName.bind(this);
    this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
    this.handleChangeNickName=this.handleChangeNickName.bind(this);
    this.handleChangeClave=this.handleChangeClave.bind(this);
    this.handleChangeRClave=this.handleChangeRClave.bind(this);
    this.listo=this.listo.bind(this);
  }
handleChangeName(event){
  this.setState({nombre: event.target.value},()=>{
    console.log(this.state.nombre)
  });
}
handleChangeCorreo(event){
  this.setState({correo: event.target.value});
}
handleChangeNickName(event){
  this.setState({nickName: event.target.value});
}
handleChangeClave(event){
  this.setState({clave: event.target.value});
}
handleChangeRClave(event){
  this.setState({repetirClave: event.target.value});
}
listo(){
  let {
    nombre,
    correo,
    nickName,
    clave,
    repetirClave,
  }=this.state;
  console.log(nombre,correo,nickName,clave,repetirClave);
  if(nombre===""){
    alert("Se requiere el nombre");
  }
  else if(correo===""){
    alert("Se requiere el correo");
  }
  else if(nickName===""){
    alert("Se requiere asignara un nickname por defecto");
  }
  else if(clave===""){
    alert("Se requiere clave");
  }
  else if(clave!=repetirClave){
    alert("la clave debe coincidir");
  }

}
  render() {
    const divStyle = {
    width: "80%",
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
  nombre,
  correo,
  nickName,
  clave,
  repetirClave,
}=this.state;
    return (
      <div style={divStyle}>

<div style={w}>
      <br/>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Nombres: </label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre y Apellido" value={nombre} onChange={this.handleChangeName}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Correo: </label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="correo@correo.com"value={correo} onChange={this.handleChangeCorreo}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput3">Nick name: </label>
            <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Nombre con el que aprece en la pagina" value={nickName} onChange={this.handleChangeNickName}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput4">Clave: </label>
            <input type="password" className="form-control" id="formGroupExampleInput4" placeholder="Clave" value={clave} onChange={this.handleChangeClave}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput5">Repetir Clave: </label>
            <input type="password" className="form-control" id="formGroupExampleInput5" placeholder="Repita la clave" value={repetirClave} onChange={this.handleChangeRClave}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.listo}>Listo</button>
      </div>
      <br/>
      <br/>
      </div>
    );
  }
}
