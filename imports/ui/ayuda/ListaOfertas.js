import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {OfertasAyuda} from '../../api/ofertasAyuda.js';
import PropTypes from "prop-types";
import PaginationO from '../pagination/PaginationO.js';
import OfertaItemLista from './OfertaItemLista.js';

/* dcagua10: La lista de las ofertas disponibles podria tener una imagen de referencia con la finalidad de que sea mas atractivo
para la persona que la busca */

class ListaOfertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList:[],
      busqueda:"",
      busquedaTipo:undefined,
      busquedaRemun:undefined
    };
    this.onChangeBusqueda = this.onChangeBusqueda.bind(this);
    this.renderList=this.renderList.bind(this);
    this.verDetalleOferta = this.verDetalleOferta.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.remunChange = this.remunChange.bind(this);
  }
  onChangeBusqueda(event){
    this.setState({busqueda:event.target.value});
  }
  tipoChange(event){
    this.setState({busquedaTipo:event.target.value});
  }
  verDetalleOferta(id){
    this.props.verDetalleOferta(id);
  }
  remunChange(event){
   this.setState({busquedaRemun:event.target.value});
  }

  renderList(solicitudes){
    let list =solicitudes;
    let busqueda = this.state.busqueda;
    let busquedaTipo = this.state.busquedaTipo;
    let busquedaRemun = this.state.busquedaRemun;

    if(list.length>0){
       if(busqueda.length>0 && !busquedaTipo && !busquedaRemun){
        let items = list.map((solicitud)=>{
          if(solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase())){

            let rand = Math.random();
            return(
              <div  className="listao" key={rand} role="listitem">
              <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
              </div>)
          }
        });
        return(<div>
          <h2 className="hIem">{"Resultado de la busqueda: "}</h2>

          <div role="list">
          {items}
          </div>
          </div>);
      }
      else if(busqueda.length===0 && busquedaTipo && !busquedaRemun)
      {
        let items=null;

        if(busquedaTipo === "Todos")
        {
          items = list.map((solicitud)=>{

            let rand = Math.random();
            return(
                <div  className="listao" key={rand} role="listitem">
              <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
              </div>)
            });
        }
        else
        {
          items = list.map((solicitud)=>{
          if(solicitud.tipo.toLowerCase().includes(busquedaTipo.toLowerCase())){
            let rand = Math.random();
            return(
                <div  className="listao" key={rand} role="listitem">
              <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
              </div>)
              }
            });
        }


          return(
          <div>
            <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


            <div role="list">
          {items}
          </div>
          <br/>
          <br/>
          </div>
           );//
      }
      else if(busqueda.length===0 && !busquedaTipo && busquedaRemun)
      {
        let si = false;

        if(busquedaRemun==="Sí")
        {
          si = true;
        }

        if(busquedaRemun!=="Todos")
        {

            let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if(solicitud.remunerada.length===0 && !si)
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else
        {
          let items = list.map((solicitud)=>{


                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }

      }
      else if(busqueda.length>0 && busquedaTipo && !busquedaRemun)
      {
        let items=null;

        if(busquedaTipo === "Todos")
        {
          items = list.map((solicitud)=>{
          if(solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase())){
            let rand = Math.random();
            return(
               <div  className="listao" key={rand} role="listitem">
              <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
              </div>)
            }
          });
        }
        else
        {
          items = list.map((solicitud)=>{
          if(solicitud.tipo.includes(busquedaTipo) &&
             solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase()))
          {
            let rand = Math.random();
            return(
                 <div  className="listao" key={rand} role="listitem">
              <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
              </div>)
          }

          });
        }


          return(
          <div>
            <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


            <div role="list">
          {items}
          </div>
          <br/>
          <br/>
          </div>
           );//
      }
      else if(busqueda.length>0 && !busquedaTipo && busquedaRemun)
      {
         let si = false;

        if(busquedaRemun==="Sí")
        {
          si = true;
        }

        if(busquedaRemun!=="Todos")
        {

            let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si && solicitud.nombreOferta.toLowerCase().includes(busqueda)){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.nombreOferta.toLowerCase().includes(busqueda))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else
        {
          let items = list.map((solicitud)=>{

               if(solicitud.nombreOferta.toLowerCase().includes(busqueda)){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
                }

              });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
      }
      else if(busqueda.length===0 && busquedaTipo && busquedaRemun)
      {
        let si = false;

        if(busquedaRemun==="Sí")
        {
          si = true;
        }

        if(busquedaRemun!=="Todos" && busquedaTipo!=="Todos")
        {
            let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si && solicitud.tipo.includes(busquedaTipo)){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.tipo.includes(busquedaTipo))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else if(busquedaRemun!=="Todos" && busquedaTipo==="Todos")
        {
          let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si)
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else if(busquedaRemun==="Todos" && busquedaTipo!=="Todos")
        {
            let items = list.map((solicitud)=>{

               if(solicitud.tipo.includes(busquedaTipo)){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else
        {
          let items = list.map((solicitud)=>{

                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
      }
      else if(busqueda.length>0 && busquedaTipo && busquedaRemun)
      {
        let si = false;

        if(busquedaRemun==="Sí")
        {
          si = true;
        }

        if(busquedaRemun!=="Todos" && busquedaTipo!=="Todos")
        {
            let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si && solicitud.tipo.includes(busquedaTipo) && solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.tipo.includes(busquedaTipo) && solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase()))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else if(busquedaRemun!=="Todos" && busquedaTipo==="Todos")
        {
          let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si && solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase()))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else if(busquedaRemun==="Todos" && busquedaTipo!=="Todos")
        {
            let items = list.map((solicitud)=>{

               if(solicitud.tipo.includes(busquedaTipo) && solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
        else
        {
          let items = list.map((solicitud)=>{

               if(solicitud.nombreOferta.toLowerCase().includes(busqueda.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
                  }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>


                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
      }
      else {
        return(
          <div>
         <PaginationO items={list} nickname={this.state.nickname} verDetalleOferta={this.verDetalleOferta} perPage={10}/>
         <br />
         <br />
         <br />
         </div>
        );
      }
    }

    else {
      return null;
    }
  }
  render() {
    const w = {
      width: "100%",
      margin: "auto",
    };
    let busqueda = this.state.busqueda;
    return (
      <div>
      <p></p>
      <br />

        <div className="row" >
          <div className="col-md-4">

                <form role="search">
                  <label htmlFor="search" className="letra">Filtrar por nombre: </label>
                  <input aria-label="Filtrar ofertas por nombre" type="text" className="form-control" placeholder="Nombre solicitud..." id="search" value={busqueda} onChange={this.onChangeBusqueda}/>
                </form>

            </div>
            <div className="col-md-4">

               <label htmlFor="tipoSolicitudAyuda" className="letra">Filtrar por tipo: </label>
                <select aria-required="true" className="form-control" id="tipoSolicitudAyuda" onChange={this.tipoChange}>
                    <option value="Todos">Todos</option>
                    <option value="Consejería y situaciones personales">Consejería y situaciones personales</option>
                    <option value="Ayuda académica">Ayuda académica</option>
                    <option value="Recomendacion">Recomendación</option>
                    <option value="Restaurantes y comida">Restaurantes y comida</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Compras o ventas">Compras o ventas</option>
                    <option value="Ropa y modas">Ropa y modas</option>
                    <option value="Ocio y entretenimiento">Ocio y entretenimiento</option>
                    <option value="Música">Musica</option>
                    <option value="Investigación y proyectos">Investigación y proyectos</option>
                    <option value="Otro">Otro</option>
                </select>

          </div>
            <div className="col-md-4">
                <label htmlFor="remuneracionAyuda" className="letra">Filtrar por remuneración: </label>
                <select aria-required="true" className="form-control" id="remuneracionAyuda" onChange={this.remunChange}>
                    <option value="Todos">Todos</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                </select>


            </div>
        </div>

      <div style={w}>

      {this.renderList(this.props.ofertasAyuda)}
      </div>
      </div>
    );
  }
}
ListaOfertas.propTypes = {
  ofertasAyuda:PropTypes.array,
};

export default withTracker(() => {

  Meteor.subscribe("ofertasAyuda");
  return {
    ofertasAyuda:OfertasAyuda.find({}).fetch(),
  };
})(ListaOfertas);
