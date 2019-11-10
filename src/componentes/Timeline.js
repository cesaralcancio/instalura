import React, { Component } from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {fotos:[]};
    }

    componentDidMount() {
        console.log('componentDidMount init')
        const token = localStorage.getItem('auth-token')
        // const url = 'http://localhost:8080/api/fotos?X-AUTH-TOKEN=' + token
        const url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`
        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
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