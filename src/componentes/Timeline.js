import React, { Component } from 'react';
import FotoItem from './FotoItem';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); 

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos:[]};
        this.login = this.props.login;
    }

    carregaFotos() {
        const token = localStorage.getItem('auth-token')
        const login = this.login;
        let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`

        if (login !== undefined) {
            url = `http://localhost:8080/api/public/fotos/${login}`
        }

        this.props.store.lista(url);
    }

    componentWillMount() {
        this.props.store.subscribe(fotos => {
          this.setState({fotos});
        });
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {
      this.props.store.like(fotoId);
    }

    comenta(fotoId, comentario) {
      this.props.store.comenta(fotoId, comentario);
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)}/>)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}