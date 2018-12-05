import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

export class Chat extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	nickname:this.props.nickname,
	    	solicitud:this.props.solicitud,
	    	idMine:this.props.idMine
	    }
	    
	    this.verSolicitudes = this.verSolicitudes.bind(this);
	    this.verOfertas = this.verOfertas.bind(this);
	    this.publicarSolicitudAyuda = this.publicarOfertaAyuda.bind(this);
	    this.publicarOfertaAyuda = this.publicarOfertaAyuda.bind(this);
	}

	atras()
	{
    	this.props.atras(true);
  	}

	verSolicitudes()
	{
		this.props.verSolicitudes();
	}
	publicarSolicitudAyuda()
	{
		this.props.publicarSolicitudAyuda();
	}
	publicarOfertaAyuda()
	{
		this.props.publicarOfertaAyuda();
	}
	verOfertas()
	{
		this.props.verOfertas();
	}

	todo()
	{
	  (function(t,a,l,k,j,s)
	    {
	    s=a.createElement('script');
	    s.async=1;
	    s.src="https://cdn.talkjs.com/talk.js";
	    a.head.appendChild(s);
	    k=t.Promise;
	    t.Talk={v:1,ready:{then:function(f)
	      {
	    if(k)
	      return new k(function(r,e)
	        {
	          l.push([f,r,e])});
	          l.push([f])},catch:function()
	          {
	            return k && new k()
	          }
	          ,c:l
	        }};
	      })(window,document,[]);
	}

	chat()
	{
		console.log(this);
		let pIdMine = this.state.idMine;
		let nameMine = this.state.nickname;
		let pIdSol = null;
		let nameOther = null;
		if(this.state.solicitud)
		{
			pIdSol = this.state.solicitud.id;
			nameOther = this.state.solicitud.nickname;
		}
		else
		{
			pIdSol = Math.random()* (10000-1000) + 1000 ;
			nameOther = "No user";
		}

	console.log("Name mine ",nameMine);
	console.log("Name other ",nameOther);
	console.log("idMine ",pIdMine);
	console.log("idOther ",pIdSol);

	  Talk.ready.then(function() {
	    var me = new Talk.User({
	        id: pIdMine,
	        name: nameMine
	    });
	    window.talkSession = new Talk.Session({
	        appId: "tNFc5x6J",
	        me: me
	    });

	    var other = new Talk.User({
	        id: pIdSol,
	        name: nameOther
	    });

	    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
	    conversation.setParticipant(me);
	    conversation.setParticipant(other);
	    var inbox = talkSession.createInbox({selected: conversation});
	    inbox.mount(document.getElementById("talkjs-container"));
		});

	}

	render() {
		const divStyle = {
      width: "70%",
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

		return (
		<div>
		<div>
			<button className="btnSelec" onClick={this.verSolicitudes}>Solicitudes de ayuda</button>
			<button className="btnOferta" onClick={this.verOfertas}>Ofertas de ayuda</button>
			<button className="btnNueva" onClick={this.publicarSolicitudAyuda}>Publicar</button>
			<button className="btnNueva" onClick={this.irAlChat}>Chat</button>
		</div>
		<button type="button" className="btnOut" onClick={this.atras.bind(this)}>Regresar</button>
		<br/>
		<br/>
		<br/>
		     {this.todo()}

		        <div style={divStyle} id="talkjs-container" className="chat"><i>Loading chat...</i></div>
		 <br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		      
		      {this.chat()}
		      

		</div>
		);
	}
}
