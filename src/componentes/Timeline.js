import React, { Component } from 'react';
import FotoItem from './FotoItem';
import Pubsub from 'pubsub-js';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); 

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos:[]};
        this.login = this.props.login;
    }

    carregaFotos() {
        console.log('componentDidMount init')
        const token = localStorage.getItem('auth-token')
        const login = this.login;
        let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`

        if (login !== undefined) {
            url = `http://localhost:8080/api/public/fotos/${login}`
        }

        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    componentWillMount() {
        Pubsub.subscribe('timeline', (topico, fotos) => {
            console.log(fotos);
            this.setState({fotos});
        });

        Pubsub.subscribe('atualiza-liker', (topico, infoLiker) => {
          const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
          fotoAchada.likeada = !fotoAchada.likeada;

          const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);
          if (possivelLiker === undefined) {
            fotoAchada.likers.push(infoLiker.liker);
          } else {
            const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
            fotoAchada.likers = novosLikers;
          }

          this.setState({fotos: this.state.fotos});
        });
  
        Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {
          const fotoAchada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId);
          fotoAchada.comentarios.push(infoComentario.novoComentario);
          this.setState({fotos: this.state.fotos});
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
        const authToken = localStorage.getItem('auth-token');
        // const fotoId = this.props.foto.id;
        const url = `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${authToken}`;
        fetch(url, {method: "POST"})
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Nao foi possivel realizar o like na foto");
            }
          }).then(liker => {
            Pubsub.publish('atualiza-liker', {fotoId: fotoId, liker});
          });
    }

    comenta(fotoId, comentario) {
        // const fotoId = this.props.foto.id;
        const token = localStorage.getItem('auth-token');
        const url = `http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`;
        const requestInfo = {
          method: "POST",
          // body: JSON.stringify({texto: this.comentario.value}),
          body: JSON.stringify({texto: comentario.value}),
          headers: new Headers({
            'Content-type': 'application/json'
          })
        };
  
        fetch(url, requestInfo)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Nao foi possivel comentar");
            }
          })
          .then(novoComentario => {
            Pubsub.publish('novos-comentarios', {fotoId: fotoId, novoComentario});
          })
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} comenta={this.comenta}/>)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}