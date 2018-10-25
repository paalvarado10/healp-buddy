import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Registro from './Registro.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registro: false,

    };
    this.registrarse = this.registrarse.bind(this);
  }
registrarse(){
  this.setState({registro:true});
}
renderRegister(){
  let registro = this.state.registro;
  if(registro){
    return(
      <Registro/>
    );
  }
  else{
    return(
      <button type="button" className="btn btn-primary btn-lg" onClick={this.registrarse}>Registrarse</button>
    );
  }
}

showContent()
{
  if(Meteor.user())
  {
    return(<div>
                <h3>Registrado</h3>
          </div>);
  }
  else
  {
    return(<div>

      <br/>
      <Carousel>
                <div>
                    <img src="/1.jpg" />
                    <p className="legend">La oportunidad de encontrar la ayuda
                    que necesitas en un solo lugar</p>
                </div>
                <div>
                    <img src="/2.jpg" />
                    <p className="legend">En algunos casos podrás obtener una remuneración por brindar ayuda a alguien</p>
                </div>
                <div>
                    <img src="/3.jpg" />
                    <p className="legend">Nuestro trabajo es conectar gente para que se ayuden mutuamente</p>
                </div>
      </Carousel>
          </div>);
  }

}

  render() {
    return (
      <div>
           <nav className="barra">
                        <a> Help Buddy </a>
                        <div className="useri">
                          <AccountsUIWrapper/>
                        </div>

           </nav>
           <br />
           <br />
           <br />

        <div className = "App">

          <div className="container">
          <br/>
          {this.renderRegister()}

          {this.showContent()}

          </div>
        </div>
      </div>
    );
  }
}


App.propTypes = {

};

export default withTracker(() => {

  return {
  };
})(App);
