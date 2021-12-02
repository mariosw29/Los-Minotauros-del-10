import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepositorio: EmpleadoRepository
    /* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarEmpleado(empleado: string, clave: string) {
    try {
      let p = this.empleadoRepositorio.findOne({where: {email: empleado, clave: clave}})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.id,
        correo: empleado.email,
        nombre: empleado.nombre + " " + empleado.apellido
      }
    },
      llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
