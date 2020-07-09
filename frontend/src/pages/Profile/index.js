import React, { useEffect, useState } from 'react';
import { Link , useHistory} from 'react-router-dom';

import api from  '../../services/api';

import './styles.css';
import logoIMG from '../../assets/logo.svg';
import { FiPower} from 'react-icons/fi';
import { FiTrash2} from 'react-icons/fi';

export default function Profile(props) {

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory('');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });
        console.log(incidents);
    }, [ongId]);

    async function handleDelete(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id));

        } catch (error) {
            alert("Erro ao excluir!");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }
    return(
        <div className="profile-container">
            <header>
                <img src={logoIMG} alt="" />
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo incidente</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Incidentes Cadastrados</h1>

            <ul>
                { incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: {incident.id}</strong>
                        <p>{incident.title}</p>
                
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL"}).format(incident.value)}</p>
                
                        <button type="button" onClick={ () => handleDelete(incident.id)} >
                            <FiTrash2 size={ 20 } color="#a8a8b3" />
                        </button>
                    </li>
                ))}


            </ul>
        </div>
    );

}