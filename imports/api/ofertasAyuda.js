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
	"ofertasA.add":function(id1, nickname, correo, nombreOferta, descripcion, tipo, remunerada, entidad){
	
	      OfertasAyuda.insert({id:id1, nickname:nickname, correo:correo, nombreOferta:nombreOferta, descripcion:descripcion,
           tipo:tipo, remunerada:remunerada, entidad:entidad});
				return true;
	  },
	"ofertasAyuda.getOfertaNombre":function(nombreSolicitud){
		const oferta = OfertasAyuda.findOne({ nombreOferta: nombreOferta});
	  return oferta;
	},
	"ofertasAyuda.getOfertaID":function(id){
			const oferta = OfertasAyuda.findOne({ _id: id});
			if(!oferta.id)
			{
				console.log("No tiene id");
				OfertasAyuda.remove(oferta);
				return undefined;
			}
			else
			{
				return oferta;
			}
		  
		},
	  "ofertasAyuda.eliminarOfertaNombre":function(id){
	  const oferta = OfertasAyuda.findOne({ _id: id});
	  OfertasAyuda.remove(oferta);
	},
	"ofertasAyuda.getAll":function(){
		const ofertas = OfertasAyuda.find({}).fetch();
		console.log(ofertas);
		return ofertas;
	}
});
