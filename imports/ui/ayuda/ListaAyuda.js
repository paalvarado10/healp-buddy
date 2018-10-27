import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {SolicitudAyuda} from '../../api/solicitudayuda.js';
import AyudaItemLista from './AyudaItemLista.js';
import PropTypes from "prop-types";
class ListaAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderList=this.renderList.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
  }
  verDetalle(id){
    this.props.verDetalle(id);
  }
  renderList(solicitudes){
    let list =solicitudes;
    if(list.length>0){
      let render = list.map((item,i)=>{
         return(<div  className="listao"><AyudaItemLista verDetalle={this.verDetalle} solicitud={item} key={i}/></div>)
      });
      return(
        <div>
        {render}
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
      <div style={w}>
      {this.renderList(this.props.solicitudesAyuda)}
      </div>
    );
  }
}
ListaAyuda.propTypes = {
  solicitudesAyuda:PropTypes.array,
};

export default withTracker(() => {
  Meteor.subscribe("solicitudayuda");
  return {
    solicitudesAyuda:SolicitudAyuda.find({}).fetch(),
  };
})(ListaAyuda);
