import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import {SolicitudAyuda} from '../../api/solicitudayuda.js';
class SolicitudA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname:this.props.nickname,
      nombreSolicitud:"",
      descripcion:"",
      tipo:"",
      remunerada:"",
      fechaLimite:"",
      entidad:""
    };
    this.nombreSolicitudChange=this.nombreSolicitudChange.bind(this);
    this.descripcionChange = this.descripcionChange.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.remuneradaChange=this.remuneradaChange.bind(this);
    this.fechaLimiteChange = this.fechaLimiteChange.bind(this);
    this.entidadChange=this.entidadChange.bind(this);
  }
  nombreSolicitudChange(event){
    this.setState({nombreSolicitud:event.target.value});
  }
  descripcionChange(event){
    this.setState({descripcion:event.target.value});
  }
  tipoChange(event){
    this.setState({tipo:event.target.value});
  }
  remuneradaChange(event){
    this.setState({remunerada:event.target.value});
  }
  fechaLimiteChange(event){
    this.setState({fechaLimite:event.target.value});
  }
  entidadChange(event){
    this.setState({entidad:event.target.value});
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
  nickname, nombreSolicitud, descripcion, tipo, remunerada, fechaLimite, entidad
}=this.state;
    return (
    <div style={divStyle}>
      <div style={w}>
      <br/>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Nombre de la Solicitud: </label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Titulo de la solicitud" value={nombreSolicitud} onChange={this.nombreSolicitudChange}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Descripción: </label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Descripcion de la solicitud"value={descripcion} onChange={this.descripcionChange}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput3">Tipo: </label>
            <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Clave" value={tipo} onChange={this.tipoChange}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput4">Remunerada: </label>
            <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Clave" value={remunerada} onChange={this.remuneradaChange}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput5">Fecha Limite: </label>
            <input type="text" className="form-control" id="formGroupExampleInput5" placeholder="Clave" value={fechaLimite} onChange={this.fechaChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput6">Entidad: </label>
            <input type="text" className="form-control" id="formGroupExampleInput6" placeholder="Clave" value={entidad} onChange={this.entidadChange}/>
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
SolicitudA.propTypes = {
  solicitudesAyuda:PropTypes.array,
};

export default withTracker(() => {
  Meteor.subscribe("solicitudayuda");

  return {
    solicitudesAyuda:SolicitudAyuda.find({}).fetch(),
  };
})(SolicitudA);
