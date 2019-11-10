import React, { Component } from 'react';

class FotoAtualizacoes extends Component {
    render() {
        return (
        <section className="fotoAtualizacoes">
            <a href="#" className="fotoAtualizacoes-like">Likar</a>
            <form className="fotoAtualizacoes-form">
            <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
            <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
            </form>
        </section>
        )
    }
}

class FotoInfo extends Component {
    render() {
        return (
            <div className="foto-info">
            <div className="foto-info-likes">
              <a href="#">
                alots_ssa
              </a>
              ,
              <a href="#">
                rafael_rollo
              </a>
               curtiram
            </div>
            <p className="foto-info-legenda">
              <a className="foto-info-autor">autor </a>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
            </p>
            <ul className="foto-info-comentarios">
              <li className="comentario">
                <a className="foto-info-autor">seguidor </a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
              </li>
              <li className="comentario">
                <a className="foto-info-autor">seguidor </a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora expedita, laborum ex soluta hic maiores veritatis deserunt.
              </li>
              <li className="comentario">
                <a className="foto-info-autor">seguidor </a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio delectus maiores voluptatibus sit commodi quidem.
              </li>
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
              <img src="https://scontent-qro1-1.cdninstagram.com/vp/650bf164a6347f41c89be8d2012f679e/5E49BABD/t51.2885-19/s320x320/36906668_1981894748517132_90127986036047872_n.jpg?_nc_ht=scontent-qro1-1.cdninstagram.com" alt="foto do usuario"/>
              <figcaption className="foto-usuario">
                <a href="#">
                  alots
                </a>  
              </figcaption>
            </figure>
            <time className="foto-data">03/10/2016 20:13</time>
          </header>
        );
    }
}

export default class Foto extends Component {

    render() {
        return (
            <div className="foto">
              <FotoHeader/>
              <img alt="foto" className="foto-src" srcSet="https://scontent-qro1-1.cdninstagram.com/vp/84acbfcb4e07fa596f1ccbce1c21ed9d/5E5BC7C4/t51.2885-15/sh0.08/e35/p640x640/70464354_185239982509700_6569608568274160865_n.jpg?_nc_ht=scontent-qro1-1.cdninstagram.com&_nc_cat=108 640w,https://scontent-qro1-1.cdninstagram.com/vp/c7fedf873d4f82a6d3ee35f3b0180dfb/5E4052C4/t51.2885-15/sh0.08/e35/p750x750/70464354_185239982509700_6569608568274160865_n.jpg?_nc_ht=scontent-qro1-1.cdninstagram.com&_nc_cat=108 750w,https://scontent-qro1-1.cdninstagram.com/vp/5e2b4d8f0df1a5721548a1eeaafa9901/5E4B8421/t51.2885-15/e35/p1080x1080/70464354_185239982509700_6569608568274160865_n.jpg?_nc_ht=scontent-qro1-1.cdninstagram.com&_nc_cat=108 1080w"/>
              <FotoInfo/>
              <FotoAtualizacoes/>
            </div>
        );
    }
}