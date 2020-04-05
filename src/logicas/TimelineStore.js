import {listagem, comentario, like, pesquisa, notificacao} from '../action/actioncreator';

export default class LogicaTimeline {

    static pesquisa(loginPesquisadoValue) {
      return dispatch => {
        const url = `http://localhost:8080/api/public/fotos/${loginPesquisadoValue}`;
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
            }
          })
          .then(fotos => {
            console.log(fotos)
            if (fotos.length === 0) {
              dispatch(notificacao('User not found.'));
            } else {
              dispatch(notificacao('User found.'));
            }

            dispatch(pesquisa(fotos));
            return fotos;
          });
      }
    }

    static lista(url) {
      return dispatch => {
        fetch(url)
          .then(response => response.json())
          .then(fotos => {
              this.fotos = fotos;
              dispatch(listagem(fotos))
              return fotos;
          });
      }
    }

    static comenta(fotoId, textoComentario) {
      return dispatch => {
        const token = localStorage.getItem('auth-token');
        const url = `http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${token}`;
        const requestInfo = {
          method: "POST",
          // body: JSON.stringify({texto: this.comentario.value}),
          body: JSON.stringify({texto: textoComentario.value}),
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
            dispatch(comentario(fotoId, novoComentario));
            return novoComentario;
          });
      }
    }

    static like(fotoId) {
      return (dispatch) => {
        const authToken = localStorage.getItem('auth-token');
        const url = `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${authToken}`;

        fetch(url, {method: "POST"})
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Nao foi possivel realizar o like na foto");
            }
          }).then(liker => {
            dispatch(like(fotoId, liker));
          });
      }
    }
}