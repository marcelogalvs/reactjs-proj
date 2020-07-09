import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import logoIMG from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'

export default function Register() {

    //react hucks
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    //historico de navegacao
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        
        const data = {
            name,
            email,
            whatsapp,
            city,uf
        };

        //console.log(data);

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso é:  ${response.data.id}` )

            history.push('/');
            
        } catch (err) {
            alert('Erro ao efetuar o cadastro. Tente novamente mais tarde!' )
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ logoIMG } alt="" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os incidentes de sua ONG.</p>

                    <Link to="/">
                        <FiArrowLeft height='16' color='#e02041'/>
                        Já tenho cadastro
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input type="text" 
                        placeholder="Nome da ONG" 
                        value={name} 
                        onChange={ e => setName(e.target.value)}
                    />

                    <input type="email" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={ e => setEmail(e.target.value)} 
                    />

                    <input type="text" 
                        placeholder="WhatsApp" 
                        value={whatsapp} 
                        onChange={ e => setWhatsapp(e.target.value)} 
                    />
                    
                    <div className="input-group">

                        <input type="text"
                            placeholder="Cidade"
                            value={city} 
                            onChange={ e => setCity(e.target.value)} 
                        />

                        <input type="text" 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf} 
                            onChange={ e => setUF(e.target.value)} 
                        />

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );

}