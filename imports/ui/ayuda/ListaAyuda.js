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
  }
  renderList(solicitudes){
    let list =solicitudes;
    console.log(list);
    console.log(list.length);
    if(list.length>0){
      let render = list.map((item,i)=>{
         console.log(item);
         return(<AyudaItemLista solicitud={item} key={i}/>)
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
