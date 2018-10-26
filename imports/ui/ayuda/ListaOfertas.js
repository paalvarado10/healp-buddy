import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {OfertasAyuda} from '../../api/ofertasAyuda.js';
import PropTypes from "prop-types";
import OfertaItemLista from './OfertaItemLista.js';

class ListaOfertas extends Component {
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
         return(<OfertaItemLista verDetalle={this.verDetalle} solicitud={item} key={i}/>)
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
      width: "80%",
      margin: "auto",
    };
    return (
      <div style={w}>
      {this.renderList(this.props.ofertasAyuda)}
      </div>
    );
  }
}
ListaOfertas.propTypes = {
  ofertasAyuda:PropTypes.array,
};

export default withTracker(() => {

  Meteor.subscribe("ofertasAyuda");
  return {
    ofertasAyuda:OfertasAyuda.find({}).fetch(),
  };
})(ListaOfertas);
