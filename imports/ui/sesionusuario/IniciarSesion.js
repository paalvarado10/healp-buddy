import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";

export default class IniciarSesion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correo: "",
      clave:"",
    };
    this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
    this.handleChangeClave=this.handleChangeClave.bind(this);
    this.listo=this.listo.bind(this);
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
  correo,
  clave,
}=this.state;
    return (
      <div style={divStyle}>
<div style={w}>
      <br/>
        <form>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Correo: </label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="correo@correo.com"value={correo} onChange={this.handleChangeCorreo}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput4">Clave: </label>
            <input type="password" className="form-control" id="formGroupExampleInput4" placeholder="Clave" value={clave} onChange={this.handleChangeClave}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.listo}>Listo</button>
      </div>
      <br/>
      </div>
    );
  }
}
