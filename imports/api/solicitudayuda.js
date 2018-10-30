import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import { Email } from 'meteor/email';

export const SolicitudAyuda = new Mongo.Collection('solicitudayuda');
//
if(Meteor.isServer)
{
	Meteor.publish("solicitudayuda", ()=>{
		return SolicitudAyuda.find({});
	});
}

Meteor.methods(
{
	"solicitudayuda.add":function(nickname, correo, nombreSolicitud, descripcion, tipo, remunerada, remunn, fechaLimite, entidad){
	      SolicitudAyuda.insert({nickname:nickname, correo: correo, nombreSolicitud:nombreSolicitud, descripcion:descripcion,
           tipo:tipo, remunerada:remunerada, remunn:remunn, fechaLimite:fechaLimite, entidad:entidad});
				return "success";
	  },
		"solicitudayuda.getAyudaID":function(id){
			const solicitud = SolicitudAyuda.findOne({ _id: id});
		  return solicitud;
		},
	"solicitudayuda.getAyudaNombre":function(nombreSolicitud){
		const solicitud = SolicitudAyuda.findOne({ nombreSolicitud: nombreSolicitud});
	  return solicitud;
	},
  "solicitudayuda.eliminarAyudaNombre":function(id){
  const solicitud = SolicitudAyuda.findOne({ _id: id});
  SolicitudAyuda.remove(solicitud);
  return solicitud;
	},

	"solicitudayuda.enviar":function(to, pfrom, asunto, mensaje){
	Meteor.startup( function() {
      process.env.MAIL_URL = "smtp://postmaster@sandbox5d645043d7d8479da382c8659d352a86.mailgun.org:d8f4eb41843381d37b0931d1eaf3a7b7-c9270c97-a9941b57";
     Email.send({ to:to, from:pfrom, subject:asunto, text:mensaje });
     });
	}
});
