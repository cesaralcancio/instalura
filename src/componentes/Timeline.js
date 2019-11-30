import React, { Component } from 'react';
import FotoItem from './FotoItem';

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

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
                }
            </div>
        );
    }
}