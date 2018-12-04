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
      id:this.props.id,
      nickname:this.props.nickname,
      correo: this.props.correo,
      nombreSolicitud:"",
      descripcion:"",
      tipo:"",
      remunerada:false,
      fechaLimite:"",
      entidad:"",
      remunn:0,
      error:""
    };
    this.nombreSolicitudChange=this.nombreSolicitudChange.bind(this);
    this.descripcionChange = this.descripcionChange.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.fechaChange = this.fechaChange.bind(this);
    this.entidadChange=this.entidadChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderRemunerada = this.renderRemunerada.bind(this);
    this.remunnChange = this.remunnChange.bind(this);
    this.listo=this.listo.bind(this);
    this.atras=this.atras.bind(this);
  }
  renderError(error){
    let err= error;
    if(err){
      return (<h2 className="errorMsg">{err}</h2>);
    }
    else{
      return null;
    }
  }
  listo(){
    let{
      id,
      nickname,
      correo,
      nombreSolicitud,
      descripcion,
      tipo,
      remunerada,
      fechaLimite,
      entidad,
      remunn
    }=this.state;
    let today = "30/10/2018";
    if(nombreSolicitud===""){
      this.setState({error:"Se require un titulo de la solicitud para se guardada"});
    }
    else if(descripcion===""){
      this.setState({error:"Brinde una descripcion para guardar la solicitud"});
    }
    else if(tipo===""){
      this.setState({error:"Brinde un tipo para guardar la solicitud"});
    }
    else if(fechaLimite===""){
      this.setState({error:"Brinde una fecha limite para guardar la solicitud"});
    }
    else{
      if(!remunerada){
        remunn=0;
      }
      let fecha = fechaLimite.split("-");
      console.log(fecha);
      let anio = parseInt(fecha[0]);
      let mes = parseInt(fecha[1]);
      let dia = parseInt(fecha[2]);
      console.log(" "+dia+" "+mes+" "+anio);
      if(anio<2018){
        this.setState({error:"La fecha limite debe ser minimo un dia despues de hoy anio"});
      }
      else if(mes<=10 && anio<=2018){
        this.setState({error:"La fecha limite debe ser minimo un dia despues de hoy"});
      }
      else{
        console.log("Correo publicador ", correo);
      Meteor.call("solicitudayuda.add", id, nickname, correo, nombreSolicitud, descripcion, tipo, remunerada, remunn, fechaLimite, entidad,(err,res)=>{if(res==="success"){
        alert("Solicitud Guaradada");
        this.atras();
      }else{
        console.log(err);
      }
    });
    }
  }
}
  atras(){
    this.props.atras(true);
  }
  remunnChange(event){
    console.log("cambia");
    this.setState({remunn:event.target.value, remunerada:true});
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
  fechaChange(event){
    this.setState({fechaLimite:event.target.value});
  }
  entidadChange(event){
    this.setState({entidad:event.target.value});
  }
  renderRemunerada(remunn){
    let r = this.state.remunerada;
    if(r){
      return (
        <div>
        <input type="number" min="0" max="100000000" className="form-control" id="formGroupExampleInputN" placeholder="Valor de la remuneración" value={remunn} onChange={this.remunnChange}/>
        </div>
      );//
    }
    else {
      return null;
    }
  }

  handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  this.setState({
    remunerada: value
  });
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
  nickname, nombreSolicitud, descripcion, tipo, remunerada, fechaLimite, entidad,remunn,error
}=this.state;
    return (
      <div>
        <br/>
        <h1 className="hIem">Crear Solicitud de Ayuda</h1>
        <br/>
    <div style={divStyle}>
      <div style={w} aria-label="Formulario para crear una solicitud de ayuda">
      {this.renderError(error)}
      <br/>
        <form>
          <div className="form-group">
            <label htmlFor="tituloSolicitudAyuda" className="letra">Título de la Solicitud: </label>
            <input aria-required="true" type="text" className="form-control" id="tituloSolicitudAyuda" placeholder="Titulo de la solicitud" value={nombreSolicitud} onChange={this.nombreSolicitudChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="descripcionSolicitudAyuda" className="letra">Descripción: </label>
            <textarea aria-required="true" className="form-control" rows="2" id="descripcionSolicitudAyuda" placeholder="Descripcion de la solicitud"value={descripcion} onChange={this.descripcionChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="tipoSolicitudAyuda" className="letra">Tipo: </label>
            <select aria-required="true" className="form-control" id="tipoSolicitudAyuda" placeholder="Seleccione alguna opción" value={tipo} onChange={this.tipoChange}>
            <option value="">Seleccione alguna opción</option>
            <option value="Consejería y situaciones personales">Consejería y situaciones personales</option>
            <option value="Ayuda académica">Ayuda académica</option>
            <option value="Recomendacion">Recomendación</option>
            <option value="Restaurantes y comida">Restaurantes y comida</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Compras o ventas">Compras o ventas</option>
            <option value="Ropa y modas">Ropa y modas</option>
            <option value="Ocio y entretenimiento">Ocio y entretenimiento</option>
            <option value="Música">Musica</option>
            <option value="Investigación y proyectos">Investigación y proyectos</option>
            <option value="Otro">Otro</option>
          </select>
          </div>
          <div className="form-group">
            <label className="letra">
            Remunerada:
            <input
              name="remunerada"
              type="checkbox"
              checked={this.state.remunerada}
              onChange={this.handleInputChange} />
            </label>
        {this.renderRemunerada(remunn)}
        
          </div>

          <div className="form-group">
          <br />
          <br />
          <br />
            <label htmlFor="fechaSolicitudAyuda" className="letra">Fecha Limite: </label>
            <input type="date" aria-required="true" className="form-control" id="fechaSolicitudAyuda" placeholder="Fecha Limite" value={fechaLimite} onChange={this.fechaChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="entidadSolicitudAyuda" className="letra">Entidad u organización: </label>
            <input type="text" aria-required="true" className="form-control" id="entidadSolicitudAyuda" placeholder="Enitidad u Organización" value={entidad} onChange={this.entidadChange}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.listo}>Publicar</button>
        <button type="button" className="btnOut" onClick={this.atras}>Atras</button>
      </div>
      <br/>
      <br/>
      </div>
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
