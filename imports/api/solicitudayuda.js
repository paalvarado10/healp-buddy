import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

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
	"solicitudayuda.add":function(nickname, nombreSolicitud, descripcion, tipo, remunerada, remunn, fechaLimite, entidad){
	      SolicitudAyuda.insert({nickname:nickname, nombreSolicitud:nombreSolicitud, descripcion:descripcion,
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
      process.env.MAIL_URL = Meteor.settings.public.stripe.mail__url;
     Email.send({ to:to, from:pfrom, subject:asunto, text:mensaje });
     });
	}
});
