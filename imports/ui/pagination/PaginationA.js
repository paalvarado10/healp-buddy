import React, { Component } from 'react';
import AyudaItemLista from '../ayuda/AyudaItemLista.js';
import '../App.css';
export default class PaginationA extends Component {
  constructor() {
    super();
    this.state = {
      items:[],
      currentPage: 1,
      todosPerPage: 4
    };
    this.handleClick = this.handleClick.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  componentWillMount(){
    if(this.props.items){

    this.setState({items:this.props.items});
    }


  }
  verDetalle(id){
this.props.verDetalle(id);
  }
  render() {

    const {  items, currentPage, todosPerPage } = this.state;
    if(items){
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
      const nickname = this.props.nickname;
      const renderTodos = currentTodos.map((item, index) => {
        return (<div  className="listao"><AyudaItemLista verDetalle={this.verDetalle} nickname={nickname} solicitud={item} key={index+"1"}/></div>);
      });
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(items.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      let selected = this.state.currentPage;
      const renderPageNumbers = pageNumbers.map(number => {
        if(number===selected){
          return (
            <li
            className="number-selected"
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        }
        else{
          return (
            <li
            className="number"
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        }
      });
      return (
        <div>
            {renderTodos}
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
    else{
      const renderPageNumbers = null;
      const renderTodos =null;
      return (
        <div>
            {renderTodos}
            <br/>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
  }
}
