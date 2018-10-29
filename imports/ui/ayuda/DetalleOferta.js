import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import StarRating from 'react-star-rating'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import {OfertasAyuda} from '../../api/ofertasAyuda.js';
import {CalificacionOferta} from '../../api/calificacionOferta.js';

class DetalleOferta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitud:this.props.solicitud,
      nickname: this.props.nickname,
      correo:this.props.correo,
      cal:3,
      auxilio:false,
      asunto:"",
      contenidoCorreo:"",
      listo:false
    };

    this.atras = this.atras.bind(this);
    this.eliminarOferta = this.eliminarOferta.bind(this);
    this.solicitarAyuda = this.solicitarAyuda.bind(this);
    this.enviar = this.enviar.bind(this);
    this.handleChangeAsunto = this.handleChangeAsunto.bind(this);
    this.handleChangeCorreo = this.handleChangeCorreo.bind(this);

//    this.handleRatingClick = this.handleRatingClick.bind(this);
  }

  enviar()
  {

    var to = this.state.solicitud.correo;
    console.log("to ", to);
    var asunto = this.state.asunto;
    var mensaje = this.state.contenidoCorreo;
    var pfrom = this.state.correo;

    console.log(mensaje);

    Meteor.call("ofertasAyuda.enviar", to, pfrom, asunto, mensaje);
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

  solicitarAyuda()
  {
    this.setState({
      auxilio:true
    });
  }

  eliminarOferta(){
    Meteor.call("ofertasAyuda.eliminarOfertaNombre",this.props.solicitud._id);

    this.atras();
  }

  renderSolicitud(solicitud){
    Meteor.call('calificacionesAyuda.getSol', solicitud.id, (err, res)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }

    });

    const center={
        margin: "auto",
        textAlign: "left",
      }
    if(solicitud.remunerada){
      return(
        <h4 className="hIem" style={center}>{"Sí"}</h4>
      );
    }
    else{
      return(
        <h4 className="hIem" style={center}>{"No"}</h4>
      );
    }

  }
  atras(){
    this.props.atras(true);
  }
  handleRatingClick(e, data) {
    alert('You left a ' + data.rating + ' star rating for ' + data.caption);
}
increaseAnswerScore(){
  console.log("AUMENTAR");
}
decreaseScore() {
  console.log("DISMINUIR");
}
  handleRate(rate){
    console.log(rate);
  }
    render() {
      let cal = this.state.cal;
      let solicitud = this.state.solicitud;
      let nickname = this.state.nickname;
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
      padding:"20px",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "20px",
      borderColor: "#FACC2E",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };//
  if(this.state.auxilio)
  {

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
        nickname, nombreOferta, descripcion, tipo, fechaLimite, entidad,remunn
      }=this.state;

    return(
        <div style={divStyle}>
      <div style={w}>
      <br/>

      <br/>
        <form>
        <h4>Envía un email a {this.state.solicitud.nickname} para solicitar su ayuda</h4>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput" className="letra">Asunto: </label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Asunto" onChange={this.handleChangeAsunto}/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2" className="letra">Body: </label>
            <textarea className="form-control" rows="4" id="formGroupExampleInput2" placeholder="Redacta el contenido del correo" onChange={this.handleChangeCorreo}/>
          </div>
        <br/>
        </form>
        <button type="button" className="btnLis" onClick={this.enviar}>Enviar</button>
        <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
      </div>
      <br/>
      <br/>
      </div>);
  }
  else if(nickname===solicitud.nickname){
    return (
      <div>
      <br/>
      <div style={divStyle} key={solicitud._id}>
      <br/>
      <br/>
      <h2 className="hIem" style={centerTitle}>Usuario que ofrece la ayuda: </h2>
        <h2 className="hIem" style={center}>{solicitud.nickname}</h2>
      <h3 className="hIem" style={centerTitle}>Título de la oferta: </h3>
      <h3 className="hIem" style={center}>{solicitud.nombreOferta}</h3>
      <h3 className="hIem" style={centerTitle}>Descripcion: </h3>
      <h3 className="hIem" style={center}>{solicitud.descripcion}</h3>
      <h3 className="hIem" style={centerTitle}>Tipo: </h3>
      <h3 className="hIem" style={center}>{solicitud.tipo}</h3>
      <h3 className="hIem" style={centerTitle}>Cobra remuneración: </h3>
      {this.renderSolicitud(solicitud)}
      <h3 className="hIem" style={centerTitle}>Entidad: </h3>
      <h3 className="hIem" style={center}>{solicitud.entidad}</h3>
      <br/>
      <br/>
      <br/>
      <button type="button" className="btnLis" onClick={this.eliminarOferta}>Eliminar</button>
      <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
      <br/>
      <br/>
      <br/>
      </div>
      </div>
    );
  }
  else {
    return (
      <div>
      <br/>
      <div style={divStyle} key={solicitud._id}>
      <br/>
      <br/>
      <h2 className="hIem" style={centerTitle}>Usuario que ofrece la ayuda: </h2>
        <h2 className="hIem" style={center}>{solicitud.nickname}</h2>
      <h3 className="hIem" style={centerTitle}>Título de la oferta: </h3>
      <h3 className="hIem" style={center}>{solicitud.nombreOferta}</h3>
      <h3 className="hIem" style={centerTitle}>Descripcion: </h3>
      <h3 className="hIem" style={center}>{solicitud.descripcion}</h3>
      <h3 className="hIem" style={centerTitle}>Tipo: </h3>
      <h3 className="hIem" style={center}>{solicitud.tipo}</h3>
      <h3 className="hIem" style={centerTitle}>Cobra remuneración: </h3>
      {this.renderSolicitud(solicitud)}
      <h3 className="hIem" style={centerTitle}>Entidad: </h3>
      <h3 className="hIem" style={center}>{solicitud.entidad}</h3>
      <br/>
      <br/>
      <button className="btnImg" onClick={this.increaseAnswerScore.bind()}><img className="imgBtn" src="/like.svg" alt="like"/></button>
      <span>   </span>
        <button className="btnImg" onClick={this.decreaseScore.bind()}><img className="imgBtn" src="/dislike.svg" alt="like"/></button>
      <br/>
      <br/>
      <br/>
      <button type="button" className="btnLis" onClick={this.solicitarAyuda}>Solicitar ayuda</button>
      <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
      <br/>
      <br/>
      <br/>
      </div>
      </div>
    );
  }

  }
}

DetalleOferta.propTypes = {
  ofertasAyuda:PropTypes.array,
};

export default withTracker(() => {

Meteor.subscribe("ofertasAyuda");

  return {
    ofertasAyuda:OfertasAyuda.find({}).fetch()
  };
})(DetalleOferta);
