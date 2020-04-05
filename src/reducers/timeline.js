import {List} from 'immutable';

export function timeline(state=new List(), action) {
    
    if (action.type === "LISTAGEM") {
        return new List(action.fotos);
    }
    if (action.type === "COMENTARIO") {
        const newLista = new List(state);
        const fotoId = action.fotoId;
        const novoComentario = action.novoComentario;

        const fotoAchada = newLista.find(foto => foto.id === fotoId);
        fotoAchada.comentarios.push(novoComentario);
        
        return newLista;
    }
    if (action.type === "LIKE") {
        const newLista = new List(state);
        const fotoId = action.fotoId;
        const liker = action.liker;

        const fotoAchada = newLista.find(foto => foto.id === fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);
        if (possivelLiker === undefined) {
            fotoAchada.likers.push(liker);
        } else {
            const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
            fotoAchada.likers = novosLikers;
        }

        return newLista;
    }

    return state;
}