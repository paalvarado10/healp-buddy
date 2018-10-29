import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import { Email } from 'meteor/email';

export const OfertasAyuda = new Mongo.Collection('ofertasAyuda');
//
if(Meteor.isServer)
{
	Meteor.publish("ofertasAyuda", ()=>{
		return OfertasAyuda.find({});
	});
}

Meteor.methods(
{
	"ofertasA.add":function(nickname, correo, nombreOferta, descripcion, tipo, remunerada, entidad){
	      OfertasAyuda.insert({nickname:nickname, correo:correo, nombreOferta:nombreOferta, descripcion:descripcion,
           tipo:tipo, remunerada:remunerada, entidad:entidad});
				return true;
	  },
	"ofertasAyuda.getOfertaNombre":function(nombreSolicitud){
		const oferta = OfertasAyuda.findOne({ nombreOferta: nombreOferta});
	  return oferta;
	},
	"ofertasAyuda.getOfertaID":function(id){
			const oferta = OfertasAyuda.findOne({ _id: id});
		  return oferta;
		},
	  "ofertasAyuda.eliminarOfertaNombre":function(id){
	  const oferta = OfertasAyuda.findOne({ _id: id});
	  OfertasAyuda.remove(oferta);
	},
	"ofertasAyuda.getAll":function(){
		const ofertas = OfertasAyuda.find({}).fetch();
		console.log(ofertas);
		return ofertas;
	},
	"ofertasAyuda.enviar":function(to, pfrom, asunto, mensaje){
Meteor.startup( function() {
      process.env.MAIL_URL = 
         "smtp://postmaster@sandboxc6bab449ec3e486b9357bc1dc507fd73.mailgun.org:59071f7e7c3dcad40011b16b7a78f114-c9270c97-ff4be79c@smtp.mailgun.org:587";
     Email.send({ to:to, from:pfrom, subject:asunto, text:mensaje });
     });
    	
	}
});
