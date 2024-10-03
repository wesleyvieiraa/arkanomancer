const crypto = require("crypto");
const pool = require("../database/pool");
const User = require("../model/user-model");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");

class UserRepository {
  async createUser(userDto) {
    try {
    const sql =
      `INSERT INTO auth.user (
        name, 
        email,  
        password_hash, 
        active
      ) VALUES (
        INITCAP($1), $2, $3, $4
      ) 
      RETURNING *;`;

      const { rows } = await pool.query(sql, [
        userDto.name,
        userDto.email,
        userDto.passwordHash,
        true
      ]);
      const user = this.factoryUser(rows, false);
      return user[0] || null;
    } catch (error) {
      logger.error(`Não foi possível inserir o usuário. ${whereAndStackError(__filename, error)}`);
      throw new Error("Não foi possível inserir este usuário.");
    }
  }

  async getUserByEmail(email, showHash = false) {
    try {
      var users = await this.genericListUsersBy(
        "SELECT * FROM auth.user WHERE email = $1;",
        [email],
        showHash
      );

      return users && users.length > 0 ? users[0] : null;
    } catch (error) {
      logger.error(`Não foi possível encontrar usuario com este email. ${whereAndStackError(__filename, error)}`);
      throw new Error("Não foi possível encontrar usuario com este email.");
    }
  }

  async genericListUsersBy(stringQuery, arrayParams, showHash = false) {
    try {
      const { rows } = await pool.query(stringQuery, arrayParams);
      const users = this.factoryUser(rows, showHash);

      return users;
    } catch (error) {
      logger.error(`Não foi possível listar usuários. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro na consulta.");
    }
  }

  async verifyCpfWasUsed(userId, cpf) {
    var userByCpf = await this.getUsuarioByCpf(cpf);
    return userByCpf && userByCpf.userId !== userId;
  }

  async verifyEmailWasUsed(userId, email) {
    var userByEmail = await this.getUserByEmail(email);
    return userByEmail && userByEmail.userId != userId;
  }

  factoryUser(rows, showHash = false) {
    let users = [];

    rows.forEach((row) => {
      let userDto = {};
      userDto.userId = row.user_id;
      userDto.name = row.name;
      userDto.email = row.email;
      userDto.active = row.active;
      userDto.generatePassword = row.generate_password;
      userDto.uidNewPassword = row.uid_new_password;

      if (showHash) {
        userDto.passwordHash = row.password_hash;
      }

      let user = new User(userDto);

      users.push(user);
    });
    return users;
  }
}

module.exports = UserRepository;