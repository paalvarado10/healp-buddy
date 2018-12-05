import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {SolicitudAyuda} from '../../api/solicitudayuda.js';
import {CalificacionAyuda} from '../../api/calificacionAyuda.js';
import AyudaItemLista from './AyudaItemLista.js';
import PaginationA from '../pagination/PaginationA.js';
import PropTypes from "prop-types";

class ListaAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
      nickname: this.props.nickname,
      list:this.props.solicitudesAyuda,
      searchList:[],
      busquedaNombre:"",
      busquedaTipo:undefined,
      busquedaRemun:undefined
    };
    this.renderList=this.renderList.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeBusqueda = this.onChangeBusqueda.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.remunChange = this.remunChange.bind(this);
  }
  onChangeBusqueda(event){
    this.setState({busquedaNombre:event.target.value});
  }
  onChangePage(pageOfItems) {
     this.setState({ pageOfItems: pageOfItems });
 }
 tipoChange(event){
    this.setState({busquedaTipo:event.target.value});
  }

  remunChange(event){
   this.setState({busquedaRemun:event.target.value});
  }
  verDetalle(id){
this.props.verDetalle(id);
  }
  renderList(solicitudes){
    let list =solicitudes;
    let busquedaNombre = this.state.busquedaNombre;
    let busquedaTipo = this.state.busquedaTipo;
    let busquedaRemun = this.state.busquedaRemun;

    if(list.length>0){
      if(busquedaNombre.length>0 && !busquedaTipo && !busquedaRemun){
        let items = list.map((solicitud)=>{
          if(solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase())){
            let rand = Math.random();
            return(
          <div  className="listao" key={rand} role="listitem">
          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
          </div>)
          }
        });
        return(
          <div>
            <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
            <br/>
            <br/>

            <div role="list">
          {items}
          </div>
          <br/>
          <br/>
          </div>
        );//
      }
      else if(busquedaNombre.length===0 && busquedaTipo && !busquedaRemun)
      {
        let items=null;

        if(busquedaTipo === "Todos")
        {
          items = list.map((solicitud)=>{

            let rand = Math.random();
            return(
                <div  className="listao" key={rand} role="listitem">
                <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
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
                <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                </div>)}
            });
        }


          return(
          <div>
            <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
            <br/>
            <br/>

            <div role="list">
          {items}
          </div>
          <br/>
          <br/>
          </div>
           );//
      }
      else if(busquedaNombre.length===0 && !busquedaTipo && busquedaRemun)
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
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if(solicitud.remunerada.length===0 && !si)
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }

      }
      else if(busquedaNombre.length>0 && busquedaTipo && !busquedaRemun)
      {
        let items=null;

        if(busquedaTipo === "Todos")
        {
          items = list.map((solicitud)=>{
          if(solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase())){
            let rand = Math.random();
            return(
            <div  className="listao" key={rand} role="listitem">
            <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
            </div>)
            }
          });
        }
        else
        {
          items = list.map((solicitud)=>{
          if(solicitud.tipo.toLowerCase().includes(busquedaTipo.toLowerCase()) &&
             solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase()))
          {
            let rand = Math.random();
            return(
                <div  className="listao" key={rand} role="listitem">
                <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                </div>)
          }

          });
        }


          return(
          <div>
            <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
            <br/>
            <br/>

            <div role="list">
          {items}
          </div>
          <br/>
          <br/>
          </div>
           );//
      }
      else if(busquedaNombre.length>0 && !busquedaTipo && busquedaRemun)
      {
         let si = false;

        if(busquedaRemun==="Sí")
        {
          si = true;
        }

        if(busquedaRemun!=="Todos")
        {

            let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre)){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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

               if(solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre)){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
                }

              });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
      }
      else if(busquedaNombre.length===0 && busquedaTipo && busquedaRemun)
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
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.tipo.includes(busquedaTipo))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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
                    <AyudaItemLista verDetalle={this.verDetalle} nicknamš={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si)
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
      }
      else if(busquedaNombre.length>0 && busquedaTipo && busquedaRemun)
      {
        let si = false;

        if(busquedaRemun==="Sí")
        {
          si = true;
        }

        if(busquedaRemun!=="Todos" && busquedaTipo!=="Todos")
        {
            let items = list.map((solicitud)=>{

               if(solicitud.remunerada === si && solicitud.tipo.includes(busquedaTipo) && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.tipo.includes(busquedaTipo) && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase()))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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

               if(solicitud.remunerada === si && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }
                    else if((solicitud.remunerada.length===0 || !solicitud.remunerada) && !si && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase()))
                    {
                      let rand = Math.random();
                      return(
                          <div  className="listao" key={rand} role="listitem">
                          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                          </div>)
                      }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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

               if(solicitud.tipo.includes(busquedaTipo) && solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
              }

                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

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

               if(solicitud.nombreSolicitud.toLowerCase().includes(busquedaNombre.toLowerCase())){
                let rand = Math.random();
                return(
                    <div  className="listao" key={rand} role="listitem">
                    <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
                    </div>)
                  }
                });

            return(
              <div>
                <h2 className="hIem">{"Resultado de la busqueda: "}</h2>
                <br/>
                <br/>

                <div role="list">
              {items}
              </div>
              <br/>
              <br/>
              </div>
               );//
        }
      }
      else{
        return(
          <div>
          <br/>
          <br/>
          <br/>

          <PaginationA items={list} nickname={this.state.nickname} verDetalle={this.verDetalle} perPage={10}/>
          <br/>
          <br/>
          <br/>
          <br/>
          </div>
        );
      }
    }
    else {
      return null;//
    }
  }
  render() {
    const w = {
      width: "100%",
      margin: "auto",
    };
    let busqueda= this.state.busqueda;
    let lista = this.state.searchList;
    if(lista.length>0){
      return (
        <div>

         <h1 className="hIem">Listado de Solicitudes de ayuda</h1>

        <div className="row" >
            <div className="col-md-4">
            <form role="search">
                  <label htmlFor="search" className="letra">Filtrar por nombre: </label>
                  <input aria-label="Filtrar solicitudes por nombre" type="text" className="form-control" placeholder="Nombre solicitud..." id="search" value={busqueda} onChange={this.onChangeBusqueda}/>
            </form>

            </div>
            <div className="col-md-4">

            </div>
            <div className="col-md-4">

            </div>
        </div>

        <div style={w}>
        {this.renderList(lista)}
        </div>
        </div>
      );
    }
    else{
    return (
      <div>
      <p></p>
      <br />

        <div className="row" >
          <div className="col-md-4">

                <form role="search">
                      <label htmlFor="BarraBusquedaAyuda" className="letra">Filtrar por nombre: </label>
                      <input aria-label="Filtrar solicitudes por nombre" type="text" className="form-control" placeholder="Nombre solicitud.." id="BarraBusquedaAyuda" value={busqueda} onChange={this.onChangeBusqueda}/>
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
      {this.renderList(this.props.solicitudesAyuda)}
      </div>
      </div>
    );
  }
  }
}
ListaAyuda.propTypes = {
  solicitudesAyuda:PropTypes.array,
  calificacionesAyuda:PropTypes.array,
};

export default withTracker(() => {
  Meteor.subscribe("solicitudayuda");
  Meteor.subscribe("calificacionesAyuda");
  return {
    solicitudesAyuda:SolicitudAyuda.find({}).fetch(),
    calificacionesAyuda:CalificacionAyuda.find({}).fetch(),
  };
})(ListaAyuda);
