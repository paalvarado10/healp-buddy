import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {SolicitudAyuda} from '../../api/solicitudayuda.js';
import {CalificacionAyuda} from '../../api/calificacionAyuda.js';
import AyudaItemLista from './AyudaItemLista.js';
import PaginationA from '../pagination/PaginationA.js';
import PropTypes from "prop-types";

class ListaAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
      nickname: this.props.nickname,
    };
    this.renderList=this.renderList.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }
  onChangePage(pageOfItems) {
     this.setState({ pageOfItems: pageOfItems });
 }
  verDetalle(id){
this.props.verDetalle(id);
  }
  renderList(solicitudes){
    let list =solicitudes;
    if(list.length>0){
      return(
        <div>
        <br/>
        <br/>
        <PaginationA items={list} nickname={this.state.nickname} verDetalle={this.verDetalle} perPage={4}/>
        </div>
      );
    }
    else {
      return null;
    }
  }
  render() {
    const w = {
      width: "100%",
      margin: "auto",
    };
    return (
      <div>
      <h1 className="hIem">Listado de Solicitudes de Ayuda</h1>
      <div style={w}>
      {this.renderList(this.props.solicitudesAyuda)}
      </div>
      </div>
    );
  }
}
ListaAyuda.propTypes = {
  solicitudesAyuda:PropTypes.array,
  calificacionesAyuda:PropTypes.array,
};

export default withTracker(() => {
  Meteor.subscribe("solicitudayuda");
  Meteor.subscribe("calificacionesAyuda");
  return {
    solicitudesAyuda:SolicitudAyuda.find({}).fetch(),
    calificacionesAyuda:CalificacionAyuda.find({}).fetch(),
  };
})(ListaAyuda);
