'use strict'

const Candidate = use('App/Models/Candidate')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CandidateController {

  async index ({ request, response, view }) {
    try {
      const candidates = await Candidate.all()
      return candidates
    } catch (error) {
      return response.status(401).send({ error: error });
    }
  }

  async store ({ request, response }) {
     const data = request.all();
    try {
      const candidate = await Candidate.create(data);
      return candidate;
    } catch (error) {
      if (error.code === "23505") {
        return response.status(401).send({ error: "Usuário já cadastrado" });
      }
      return response.status(401).send({ error: error });
    }
  }

  async show ({ params, request, response, view }) {
      try {
      const candidate = await Candidate.findOrFail(params.id);
      return candidate;
    } catch (error) {
      return response.status(400).send({ "Erro": "Não encontramos o candidato com o id informado, por favor verifique o id e tente novamente" });
    }
  }

  async update ({ params, request, response, view }) {
     try {
      const candidate = await Candidate.findOrFail(params.id);
      const data = request.all();

      candidate.merge(data);
      
      await candidate.save();
      return candidate;
    } catch (error) {
      if (error.code === "23505") {
        return response.status(401).send({ error: "Usuário já cadastrado" });
      }
      return response.status(401).send({ error: error });
    }
  }

  async destroy({ params, auth, response }) {
    try {
      const candidate = await Candidate.findOrFail(params.id);
      await candidate.delete();
      return response
        .status(401)
        .send({ "Sucesso": "Usuário removido com sucesso" });
    } catch (error) {
      return response.status(401).send({ error: error });
    }
  }
}

module.exports = CandidateController
