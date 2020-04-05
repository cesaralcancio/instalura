import Pubsub from 'pubsub-js';

export default class LogicaTimeline {

    constructor(fotos) {
        if (fotos === undefined) {
            this.fotos = [];
        } else {
            this.fotos = fotos;
        }
    }

    lista(url) {
        fetch(url)
        .then(response => response.json())
        .then(fotos => {
            Pubsub.publish('timeline', fotos);
            this.fotos = fotos;
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
            const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
            fotoAchada.comentarios.push(novoComentario);

            Pubsub.publish('timeline', this.fotos);
          })
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
            const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
            fotoAchada.likeada = !fotoAchada.likeada;
  
            const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);
            if (possivelLiker === undefined) {
              fotoAchada.likers.push(liker);
            } else {
              const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
              fotoAchada.likers = novosLikers;
            }

            Pubsub.publish('timeline', this.fotos);
          });
    }

    subscribe(callback) {
        Pubsub.subscribe('timeline', (topico, fotos) => {
            callback(fotos);
            // this.setState({fotos});
        });
    }
}