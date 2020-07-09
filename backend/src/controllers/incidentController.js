const connection = require("../database/connection");

module.exports = {

    //LISTA OS EVENTOS
    async index(request, response) {
        const { page = 1 } = request.query;

        //busca total de registros
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.city', 'ongs.uf']); 

        //coloca o contador no header
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents); 
    },


    //CRIA O EVENTO
    async create(request, response) {
        const { title,description, value } = request.body;
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value, 
            ong_id
        })
        return response.json({ id });
    },

    //DELETA O EVENTO
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id) {
            return response.status(401).json( { error: "Nao autorizado." });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }

}