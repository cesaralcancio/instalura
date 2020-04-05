export function listagem(fotos) {
    return {type: 'LISTAGEM', fotos};
}

export function comentario(fotoId, novoComentario) {
    return {type: 'COMENTARIO', fotoId, novoComentario};
}

export function like(fotoId, liker) {
    return {type: 'LIKE', fotoId, liker};
}

export function pesquisa(fotos) {
    return {type: 'PESQUISA', fotos};
}

export function notificacao(msg) {
    return {type: 'NOTIFICACAO', msg};
}