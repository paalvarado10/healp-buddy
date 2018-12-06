import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { withTracker } from 'meteor/react-meteor-data';
import {CalificacionAyuda} from '../../api/calificacionAyuda.js';
import {Chat} from "../chat/Chat.js";

/* dcagua10: Cuando califico una ayuda estoy obligado a volver a ver los detalles de esta (Sale a la pagina principal cuando se califica) */
class DetalleAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitud:this.props.solicitud,
      nickname: this.props.nickname,
      id:this.props.id,
      cal:0,
      calificacion:this.props.calificacion,
      asunto:"",
      contenidoCorreo:"",
      ayudar:false,
      calificaciones: this.props.calificaciones
    };
     this.increaseAnswerScore= this.increaseAnswerScore.bind(this);
     this.decreaseScore= this.decreaseScore.bind(this);
  //  this.renderCal = this.renderCal.bind(this);
    this.atras = this.atras.bind(this);
   this.load = this.load.bind(this);
    this.eliminarSolicitud = this.eliminarSolicitud.bind(this);
    this.enviar = this.enviar.bind(this);
    this.handleChangeAsunto = this.handleChangeAsunto.bind(this);
    this.handleChangeCorreo = this.handleChangeCorreo.bind(this);
    this.darAyuda = this.darAyuda.bind(this);
   // this.chat = this.chat.bind(this);
  }

  enviar()
  {
    var to = this.state.solicitud.correo;
    console.log("to ", to);
    var asunto = this.state.asunto;
    var mensaje = this.state.contenidoCorreo;
    var pfrom = this.state.correo;

    this.atras();
  }

  handleChangeAsunto(event)
  {
    this.setState({
      asunto:event.target.value
    });
  }

  handleChangeCorreo(event)
  {
    this.setState({
      contenidoCorreo:event.target.value
    });
  }

  darAyuda()
  {
    this.setState({
      ayudar:true
    });
  }

  load(){

      if(this.state.cal!=0 || this.state.calificacion != undefined){
        return null;
      }
      else {
          return (
            <div>
            <button className="btnImg" onClick={this.increaseAnswerScore.bind()}><img className="imgBtn" src="/like.svg" alt="like"/></button>
            <span>   </span>
              <button className="btnImg" onClick={this.decreaseScore.bind()}><img className="imgBtn" src="/dislike.svg" alt="dislike"/></button>
            </div>
          );
      }

  }



  eliminarSolicitud(){
    Meteor.call("solicitudayuda.eliminarAyudaNombre",this.props.solicitud._id);

    this.atras();
  }
  renderSolicitud(solicitud){
    const divStyle = {
      margin: "auto",
      textAlign: "center",
    }
    const center={
        margin: "auto",
        textAlign: "left",
      }


    if(solicitud.remunerada){

      return(
        <h4 className="hIem" style={center}>{"$"+solicitud.remunn}</h4>
      );
    }
    else{
      return(
        <h4 className="hIem" style={center}>{"No aplica"}</h4>
      );
    }

  }
  atras(atras){
    this.props.atras(atras);

  }
increaseAnswerScore(){
  let cali = 1;
  Meteor.call("calificacionesAyuda.add",this.state.solicitud._id,this.state.nickname,cali,(err, res)=>{
    if(err){
      console.log(err);
    }
    else {
      alert("Gracias, tu calificación ha sido guardada");
      this.atras();
    }
  });
}
decreaseScore() {
  let cali = -1;
  Meteor.call("calificacionesAyuda.add",this.state.solicitud._id,this.state.nickname,cali,(err, res)=>{
    if(err){
      console.log(err);
    }
    else {
      alert("Gracias, tu calificación ha sido guardada");
      this.atras();
    }
  });
}
renderCalificacion(calificaciones){
  const centerTitle={
    margin: "auto",
    textAlign: "left",
    color:"#00A0D8",
  }
  const red ={
    color:"#CE7885",
  }

  const green ={
    color:"#28D160",
  }

  let cal =0

  calificaciones.map((calificacion)=>{
    console.log(calificacion.puntos);
    cal+= parseInt(calificacion.puntos);
  });
  if(cal>=0){
    return (
      <h4 className="hIem" style={centerTitle}>Calificación: <span style={green}>{cal}</span></h4>
    );
  }
  else{
  return (
      <h4 className="hIem" style={centerTitle}>Calificación:<span style={red}>{cal}</span></h4>
  );
  }
}//
    render() {
      let cal = this.state.cal;
      let solicitud = this.state.solicitud;
      const center={
        margin: "auto",
        textAlign: "left",
      }
      const centerTitle={
        margin: "auto",
        textAlign: "left",
        color:"#00A0D8",
      }
      let src = {
        backgroundImage: 'src("/like.svg")',
      }
      const divStyle = {
      width: "40%",
      margin: "auto",
      padding: "20px",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "20px",
      borderColor: "#00A0D8",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };
  let nickname = this.state.nickname;
  let idMine = this.state.id;
  if(this.state.ayudar)
  {
    return (
      <div>
        <Chat nickname={nickname} solicitud={solicitud} idMine={idMine} atras={this.atras}/>
      </div>
      );//

    //{this.chat(nickname, solicitud.nickname, solicitud.id, idMine)}  
  }
  else if(this.state.nickname===solicitud.nickname){
    return (
      <div>
      <br/>
      <div style={divStyle} key={solicitud._id}>
      <br/>
      <h2 className="hIem" style={centerTitle}>Usuario que solicita la ayuda: </h2>
        <h2 className="hIem" style={center}>{solicitud.nickname}</h2>
      <h3 className="hIem" style={centerTitle}>Nombre de la solicitud: </h3>
      <h3 className="hIem" style={center}>{solicitud.nombreSolicitud}</h3>
      <h3 className="hIem" style={centerTitle}>Descripcion: </h3>
      <h3 className="hIem" style={center}>{solicitud.descripcion}</h3>
      <h3 className="hIem" style={centerTitle}>Tipo: </h3>
      <h3 className="hIem" style={center}>{solicitud.tipo}</h3>
      <h3 className="hIem" style={centerTitle}>Remuneración: </h3>
      {this.renderSolicitud(solicitud)}
      <h3 className="hIem" style={centerTitle}>Fecha Limite: </h3>
      <h3 className="hIem" style={center}>{solicitud.fechaLimite}</h3>
      <h3 className="hIem" style={centerTitle}>Entidad: </h3>
      <h3 className="hIem" style={center}>{solicitud.entidad}</h3>
            {this.renderCalificacion(this.props.calificaciones)}
      <br/>
      <br/>
      <br/>
      <button type="button" className="btnLis" onClick={this.eliminarSolicitud}>Eliminar</button>
      <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
      <br/>
      <br/>
      <br/>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>
    );
  }
  else{
    return (
      <div>
      <br/>
      <div style={divStyle} key={solicitud._id}>
      <br/>
      <h2 className="hIem" style={centerTitle}>Usuario que solicita la ayuda: </h2>
        <h2 className="hIem" style={center}>{solicitud.nickname}</h2>
      <h3 className="hIem" style={centerTitle}>Nombre de la solicitud: </h3>
      <h3 className="hIem" style={center}>{solicitud.nombreSolicitud}</h3>
      <h3 className="hIem" style={centerTitle}>Descripcion: </h3>
      <h3 className="hIem" style={center}>{solicitud.descripcion}</h3>
      <h3 className="hIem" style={centerTitle}>Tipo: </h3>
      <h3 className="hIem" style={center}>{solicitud.tipo}</h3>
      <h3 className="hIem" style={centerTitle}>Remuneración: </h3>
      {this.renderSolicitud(solicitud)}
      <h3 className="hIem" style={centerTitle}>Fecha Limite: </h3>
      <h3 className="hIem" style={center}>{solicitud.fechaLimite}</h3>
            {this.renderCalificacion(this.props.calificaciones)}
      <br/>
      <br/>
      <br/>
      <br/>
      {this.load()}
      <br/>
      <br/>
      <br/>
      <button type="button" className="btnLis2" onClick={this.darAyuda}>Contactar para ayudar</button>
      <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
      <br/>
      <br/>
      <br/>
      </div>
      <br/>
      <br/>
      <br/>
      </div>
    );
  }
  }
}
DetalleAyuda.propTypes = {
  calificacionesAyuda:PropTypes.array,
};
export default withTracker(() => {
  Meteor.subscribe("calificacionesAyuda");
  return {
    calificacionesAyuda:CalificacionAyuda.find({}).fetch(),
  };
})(DetalleAyuda);
