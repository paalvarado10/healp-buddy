import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
export default class DetalleAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitud:this.props.solicitud
    };
    this.atras = this.atras.bind(this);
  }
  renderSolicitud(solicitud){
    const divStyle = {
      margin: "auto",
      textAlign: "center",
    }
    if(solicitud.remunerada){
      return(
        <h4 className="hIem" style={divStyle}>{"Remuneración: $"+solicitud.remunn}</h4>
      );
    }
    else{
      return null;
    }

  }
  atras(){
    this.props.atras(true);
  }
    render() {
      let solicitud = this.state.solicitud;
      const center={
        margin: "auto",
        textAlign: "center",
      }
      const centerTitle={
        margin: "auto",
        textAlign: "center",
        color:"#00A0D8",
      }
      const divStyle = {
      width: "90%",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "20px",
      borderColor: "#00A0D8",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };
    return (
      <div>
      <br/>
      <div style={divStyle} key={solicitud._id}>
      <br/>
      <br/>
      <h2 className="hIem" style={centerTitle}>Usuario que solicita la ayuda: </h2>
        <h2 className="hIem" style={center}>{solicitud.nickname}</h2>
      <h3 className="hIem" style={centerTitle}>Nombre de la solicitud: </h3>
      <h3 className="hIem" style={center}>{solicitud.nombreSolicitud}</h3>
      <h3 className="hIem" style={centerTitle}>Descripcion: </h3>
      <h3 className="hIem" style={center}>{solicitud.descripcion}</h3>
      <br/>
      <h3 className="hIem" style={centerTitle}>Tipo: </h3>
      <h3 className="hIem" style={center}>{solicitud.tipo}</h3>
      {this.renderSolicitud(solicitud)}
      <h3 className="hIem" style={centerTitle}>Fecha Limite: </h3>
      <h3 className="hIem" style={center}>{solicitud.fechaLimite}</h3>
      <h3 className="hIem" style={centerTitle}>Entidad: </h3>
      <h3 className="hIem" style={center}>{solicitud.entidad}</h3>
      <br/>
      <button type="button" className="btnLis">Ayudar</button>
      <button type="button" className="btnOut" onClick={this.atras}>Atras</button>
      <br/>
      <br/>
      <br/>
      </div>
      </div>
    );
  }
}
