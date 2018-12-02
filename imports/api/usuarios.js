import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import { check } from 'meteor/check';

export const Usuarios = new Mongo.Collection('usuarios');
//
if(Meteor.isServer)
{
	Meteor.publish("usuarios", ()=>{
		return Usuarios.find({});
	});
}

Meteor.methods(
{

	"usuarios.add":function(id1, nombre,correo,nickname,claveHash){

		check(nombre, String);
		check(correo, String);
		check(nickname, String);
		
		const usuario = Usuarios.findOne({
    	$or:[{correo:correo}, {nickname:nickname}]
	  });
	  if(!usuario)
	  {
	      Usuarios.insert({id:id1,nombre:nombre,correo:correo,nickname:nickname,claveHash:claveHash});
				return "success";
	  }
	  else
	  {
			return "err";
	  }
	},
	"usuarios.getUser":function(correo){
		check(correo, String);
		const usuario = Usuarios.findOne({ correo: correo});
		if(!usuario.id)
		{
			console.log("No tiene id");
			Usuarios.remove(usuario);
			return null;
		}
		else
		{
			return usuario;
		}
	  
		
	},
	"usuarios.getNickName":function(nickname){
		check(nickname, String);
		const usuario = Usuarios.findOne({
    	nickname:nickname
	  });
		return usuario;
	},
	"usuarios.getCorreo":function(correo){
		check(correo, String);
		const usuario = Usuarios.findOne({
    	correo:correo
	  });
		return usuario;
	}
});
