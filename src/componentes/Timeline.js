import React, { Component } from 'react';
import FotoItem from './FotoItem';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import TimelineStore from '../logicas/TimelineStore'

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

        this.props.store.dispatch(TimelineStore.lista(url));
    }

    componentDidMount() {
        this.carregaFotos();
    }

    // a magica ta aqui, a cada vez que o redux atualiza a store, 
    // tem esse subscribe que atualiza o atributo aqui, e ai atualiza todos os filhos
    // antes, esse subscribe era da store que fizemos com o PuSub que tinha um subscribe e que 
    // recebia um callback e esse callback era justamente o setStatus
    componentWillMount() {
        this.props.store.subscribe(() => {
          this.setState({fotos: this.props.store.getState()});
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {
      this.props.store.dispatch(TimelineStore.like(fotoId));
    }

    comenta(fotoId, comentario) {
      this.props.store.dispatch(TimelineStore.comenta(fotoId, comentario));
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