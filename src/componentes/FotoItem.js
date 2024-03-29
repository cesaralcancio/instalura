import React, { Component } from 'react';
import { Link } from 'react-router';

class FotoAtualizacoes extends Component {
    like(event) {
      event.preventDefault();
      const fotoId = this.props.foto.id;
      this.props.like(fotoId);
    }

    comenta(event) {
      event.preventDefault();
      const fotoId = this.props.foto.id;
      const novoComentario = this.comentario;
      this.props.comenta(fotoId, novoComentario);
    }

    render() {
        return (
        <section className="fotoAtualizacoes">
            <a onClick={this.like.bind(this)} className={this.props.foto.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"} >Likar</a>
            <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
            <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
            <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
            </form>
        </section>
        )
    }
}

class FotoInfo extends Component {
    render() {
        return (
            <div key={this.props.foto.id} className="foto-info">
            <div className="foto-info-likes">
              {
                this.props.foto.likers.map(liker => {
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
                this.props.foto.comentarios.map(comentario => {
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
              <FotoAtualizacoes {...this.props}/>
            </div>
        );
    }
}