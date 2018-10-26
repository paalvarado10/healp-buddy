import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import SolicitudA from './ayuda/SolicitudA.js';
import OfertaA from './ayuda/OfertaA.js';

export default class TableroSolicitudes extends Component {
	constructor(props) {
    super(props);

	    this.state = {
				nuevaOfertaAyuda:false,
				nuevaSolicitudAyuda:false,
				nickname:this.props.nickname
	    };

	    	this.publicarOfertaAyuda = this.publicarOfertaAyuda.bind(this);
			this.publicarSolicitudAyuda = this.publicarSolicitudAyuda.bind(this);
			this.renderAyuda = this.renderAyuda.bind(this);
			this.atras= this.atras.bind(this);
	}

	atras(atras){
		this.setState({nuevaSolicitudAyuda:false, nuevaOfertaAyuda:false});
	}
	publicarSolicitudAyuda()
	{
		this.setState({nuevaSolicitudAyuda:true});
	}
	publicarOfertaAyuda()
	{
		this.setState({nuevaOfertaAyuda:true});
	}

	renderAyuda(){

		if(this.state.nuevaSolicitudAyuda)
		{
			return (
				<SolicitudA nickname={this.state.nickname} atras={this.atras}/>
			);
		}
		else if(this.state.nuevaOfertaAyuda)
		{
			return (
				<OfertaA nickname={this.state.nickname} atras={this.atras}/>
			);
		}
		else {
			return(
				<div>
					<button className="btnOferta" onClick={this.publicarOfertaAyuda}>Publicar oferta de ayuda</button>
					<button className="btnOferta" style={{width:"auto"}}onClick={this.publicarSolicitudAyuda}>Publicar solicitud de ayuda</button>
				</div>
		);
		}
	}

	render() {

		return (
			<div>
			{this.renderAyuda()}
			</div>
		);
	}
}
