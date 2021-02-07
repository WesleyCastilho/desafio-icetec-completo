'use strict'

const User = use("App/Models/User");

class UserController {
    async store({ request, response }) {
        const data = request.all();
        console.log(data)
        try {
          const user = await User.create(data);
          return user;
        } catch (error) {
          if (error.code === "23505") {
            return response.status(401).send({ error: "Usuário já cadastrado" });
          }
          return response.status(401).send({ error: error });
        }
    }
}
module.exports = UserController
