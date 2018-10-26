import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import SolicitudA from './ayuda/SolicitudA.js';
import ListaAyuda from './ayuda/ListaAyuda.js';
export default class TableroSolicitudes extends Component {
	constructor(props) {
    super(props);

	    this.state = {
				nuevaOferaAyuda:false,
				nickname:this.props.nickname
	    };
	    this.publicarOferta = this.publicarOferta.bind(this);
			this.publicarSolicitudAyuda = this.publicarSolicitudAyuda.bind(this);
			this.renderAyuda = this.renderAyuda.bind(this);
			this.atras= this.atras.bind(this);
	}
	atras(atras){
		this.setState({nuevaOferaAyuda:false});
	}
	publicarSolicitudAyuda()
	{
		this.setState({nuevaOferaAyuda:true});
	}
	publicarOferta()
	{
	}
	renderAyuda(){
		if(this.state.nuevaOferaAyuda)
		{
			return (
				<SolicitudA nickname={this.state.nickname} atras={this.atras}/>
			);
		}
		else {
			return(
				<div>
					<button className="btnOferta" onClick={this.publicarOferta}>Publicar oferta de ayuda</button>
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
