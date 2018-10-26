import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const SolicitudAyuda = new Mongo.Collection('solicitudayuda');
//
if(Meteor.isServer)
{
	Meteor.publish("solicitudayuda", ()=>{
		return Usuarios.find({});
	});
}

Meteor.methods(
{
	"solicitudayuda.add":function(nickname, nombreSolicitud, descripcion, tipo, remunerada, fechaLimite, entidad){
	      SolicitudAyuda.insert({nickname:nickname, nombreSolicitud:nombreSolicitud, descripcion:descripcion,
           tipo:tipo, remunerada:remunerada, fechaLimite:fechaLimite, entidad:entidad});
				return "success";
	  },
	"solicitudayuda.getAyudaNombre":function(nombreSolicitud){
		const solicitud = SolicitudAyuda.findOne({ nombreSolicitud: nombreSolicitud});
	  return solicitud;
	},
  "solicitudayuda.eliminarAyudaNombre":function(id){
  const solicitud = SolicitudAyuda.deleteOne({ _id: id});
  return solicitud;
}
});
