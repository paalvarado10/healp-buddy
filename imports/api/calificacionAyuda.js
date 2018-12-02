import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const CalificacionAyuda = new Mongo.Collection('calificacionesAyuda');
if(Meteor.isServer)
{
	Meteor.publish("calificacionesAyuda", ()=>{
		return CalificacionAyuda.find({});
	});
}

Meteor.methods(
{
	"calificacionesAyuda.add":function(idAyuda, nickname, puntos){
		check(idAyuda, String);
		check(nickname, String);
		check(puntos, Number);
				return CalificacionAyuda.insert({nickname:nickname, idAyuda:idAyuda, puntos:puntos});
	  },
		"calificacionesAyuda.get":function(idAyuda, nickname){
			check(idAyuda, String);
			check(nickname, String);
			const calificacion = CalificacionAyuda.findOne({ idAyuda:idAyuda ,nickname:nickname});
		  return calificacion;
		},
		"calificacionesAyuda.getSol":function(idAyuda){
			check(idAyuda, String);
			const calificacion = CalificacionAyuda.find({ idAyuda:idAyuda}).fetch();
			if(!calificacion)
		  {

					return null;
		  }
		  else
		  {
				return calificacion;
		  }
		},
	"calificacionesAyuda.getAll":function(){
		const calificaciones = CalificacionAyuda.find({}).fetch();
		return calificacion;
	}
});
