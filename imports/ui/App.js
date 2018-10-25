import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

  }

showContent()
{
  console.log(Meteor.user());
  if(Meteor.user())
  {
    return(<div>
                <h3>Registrado</h3>
          </div>);
  }
  else
  {
    return(<div class="carrusel">

      <br/>
      <br/>
      <br/>
      <table class="table">
      <tr>
          <td>
             <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true} width={"800px"}>
                <div>
                    <img src="/1.jpg" />
                </div>
                <div>
                    <img src="/2.jpg"></img>
                    
                </div>
                <div>
                    <img src="/3.jpg"></img>
                </div>
            </Carousel>
          </td>
              <td>
              <h3>
                  ¿Necesitas ayuda? <br/>Estás en el lugar indicado <br/><br/>
                  ¿Te gusta ayudar? <br/>También acá puedes hacerlo y hasta recibir una remuneración
                  por ello<br/><br/><br/>
                  Regístrate y únete al progreso porque todos necesitamos la ayuda de alguien
                  y todos podemos cooperar en algo
                  </h3>

             </td>
      </tr>                        
      </table>                  

      
      
          </div>);
          //
  }
  
}

  render() {
    return (
      <div>

           <nav class="barra">
                        <a> <img class="q" src="/q.png" alt="help buddy icon"/> Help Buddy </a>
                        <div class="useri">
                          <AccountsUIWrapper/>
                        </div>

           </nav>
           <br />
           <br />
           <br />

        <div class = "App">

          <div className="container">

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
