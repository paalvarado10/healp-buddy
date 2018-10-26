import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import SolicitudA from './ayuda/SolicitudA.js';
import ListaAyuda from './ayuda/ListaAyuda.js';
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
					<button className="btnOferta" style={{width:"auto"}}onClick={this.publicarSolicitudAyuda}>Publicar solicitud de ayuda</button>
					<button className="btnOferta" style={{width:"auto"}}onClick={this.publicarSolicitudAyuda}>Publicar Solicitud de ayuda</button>
					<div className="row">
  					<div className="col-md-6 col-md-push-6">
							<h1 className="hIem">Listado de Ofertas de ayuda</h1>
						</div>
  					<div className="col-md-6 col-md-pull-6">
							<h1 className="hIem">Listado de Solicitudes de ayuda</h1>
							<ListaAyuda/>
						</div>
					</div>
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
