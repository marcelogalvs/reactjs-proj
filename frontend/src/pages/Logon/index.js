import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import { FiLogIn } from 'react-icons/fi';

import heroesIMG from '../../assets/heroes.png';
import logoIMG from '../../assets/logo.svg';

export default function Logon(){

    const [id, setID] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });  
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch (err) {
            alert('Falha no Login.')
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logoIMG } alt="" />

                <form onSubmit={handleLogin}>
                    <h1> Faça seu Logon </h1>

                    <input type="text" 
                        placeholder="Sua ID"
                        name="id"
                        value={ id }
                        onChange={ e => setID(e.target.value)} 
                    />

                    <button type="submit" className="button">Entrar</button>
                    
                    <Link to="/register">
                        <FiLogIn height='16' color='#e02041'/>
                        Não tenho cadastro
                    </Link>

                </form>
            </section>

            <img src={ heroesIMG } alt="" />
        </div>
    )
}