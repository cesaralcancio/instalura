import React, { Component } from 'react';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js';

class FotoAtualizacoes extends Component {

    constructor(props) {
      super(props);
      this.state = {likeada: this.props.foto.likeada};
    }


    like(event) {
      event.preventDefault();

      const authToken = localStorage.getItem('auth-token');
      const fotoId = this.props.foto.id;
      const url = `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${authToken}`;
      fetch(url, {method: "POST"})
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Nao foi possivel realizar o like na foto");
          }
        }).then(liker => {
          this.setState({likeada: !this.state.likeada});
          Pubsub.publish('atualiza-liker', {fotoId: this.props.foto.id, liker});
        });
    }

    comenta(event) {
      event.preventDefault();

      const fotoId = this.props.foto.id;
      const token = localStorage.getItem('auth-token');
      const url = `http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`;
      const requestInfo = {
        method: "POST",
        body: JSON.stringify({texto: this.comentario.value}),
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
          Pubsub.publish('novos-comentarios', {fotoId: this.props.foto.id, novoComentario});
        })
    }


    render() {
        return (
        <section className="fotoAtualizacoes">
            <a onClick={this.like.bind(this)} className={this.state.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"} >Likar</a>
            <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
            <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
            <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
            </form>
        </section>
        )
    }
}

class FotoInfo extends Component {

    constructor(props) {
      super(props);
      this.state = {likers: this.props.foto.likers, comentarios: this.props.foto.comentarios};
    }

    componentWillMount(){
      Pubsub.subscribe('atualiza-liker', (topico, infoLiker) => {
        if (this.props.foto.id === infoLiker.fotoId) {
          const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);

          if (possivelLiker === undefined) {
            const novosLikers = this.state.likers.concat(infoLiker.liker);
            this.setState({likers: novosLikers});
          } else {
            const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
            this.setState({likers: novosLikers});
          }
        }
      });

      Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {
        console.log('Novo comentario');
        console.log(topico);
        console.log(infoComentario);

        if (this.props.foto.id === infoComentario.fotoId) {
          const novoComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
          this.setState({comentarios: novoComentarios});
        }
      });
    }

    render() {
        return (
            <div key={this.props.foto.id} className="foto-info">
            <div className="foto-info-likes">
              {
                this.state.likers.map(liker => {
                  return (<Link key={liker.login} to={`/timeline/${liker.login}`}>{liker.login}</Link>)
                })
              }
              &nbsp; curtiram
            </div>
            <p className="foto-info-legenda">
              <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">autor </Link>
              {this.props.foto.comentario}
            </p>
            <ul className="foto-info-comentarios">
              {
                this.state.comentarios.map(comentario => {
                  return (
                    <li className="comentario" key={comentario.id}>
                      <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login}</Link>
                        &nbsp;{comentario.texto}
                    </li>
                  );
                })
              }
            </ul>
          </div>
        );
    }
}

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
            <figure className="foto-usuario">
              <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
              <figcaption className="foto-usuario">
                <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                  {this.props.foto.loginUsuario}
                </Link>  
              </figcaption>
            </figure>
            <time className="foto-data">{this.props.foto.horario}</time>
          </header>
        );
    }
}

export default class FotoItem extends Component {

    render() {
        return (
            <div className="foto">
              <FotoHeader foto={this.props.foto}/>
              <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
              <FotoInfo foto={this.props.foto}/>
              <FotoAtualizacoes foto={this.props.foto}/>
            </div>
        );
    }
}