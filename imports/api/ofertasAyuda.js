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
         "Aca va lo de whatsapp";
     Email.send({ to:to, from:pfrom, subject:asunto, text:mensaje });
     });
    	
	}
});
