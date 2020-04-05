export default class LogicaTimeline {

    static lista(url) {
      return dispatch => {
        fetch(url)
          .then(response => response.json())
          .then(fotos => {
              this.fotos = fotos;
              dispatch({type: 'LISTAGEM', fotos: fotos})
              return fotos;
          });
      }
    }

    static comenta(fotoId, comentario) {
      return dispatch => {
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
            dispatch({type: 'COMENTARIO', fotoId, novoComentario});
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
            dispatch({type: 'LIKE', fotoId, liker});
          });
      }
    }
}