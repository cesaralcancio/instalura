import React, { Component } from 'react';
import TimelineStore from '../logicas/TimelineStore'

export default class Header extends Component {

    constructor(props){
        super(props);
        this.state = {msg: 'Ola'};
    }

    pesquisa(event) {
        event.preventDefault();
        const loginPesquisadoValue = this.loginPesquisado.value;
        console.log('pesquisa: ' + loginPesquisadoValue);
        this.props.store.dispatch(TimelineStore.pesquisa(loginPesquisadoValue));
    }

    componentDidMount(){
        this.props.store.subscribe(() => {
            this.setState({msg: this.props.store.getState().header});
        });
    }

    render() {
        return (
            <header className="header container">
            <h1 className="header-logo">
              Instalura
            </h1>
            <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
              <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input}/>
              <input type="submit" value="Buscar" className="header-busca-submit"/>
            </form>
            <nav>
                <ul className="header-nav">
                    <li className="header-nav-item">
                    <span>{this.state.msg}</span>
                    <a href="#">
                        ♡
                        {/*♥*/}
                        {/*Quem deu like nas minhas fotos?*/}
                    </a>
                    </li>
                </ul>
                </nav>
            </header>
        );
    }
}