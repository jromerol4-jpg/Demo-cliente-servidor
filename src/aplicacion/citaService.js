// Casos de uso de citas: coordinan las reglas del dominio y los repositorios.
const reglas = require('../dominio/reglasDeAgenda');
const { verificarRepositorios } = require('./contratos/repositorios');

/*
async function consultarCitas() {
  return citaRepository.listarTodas();
}

async function consultarProfesionales() {
  return citaRepository.listarTodos();
}

async function reservarCita(datos) {
  reglas.validarDatosCompletos(datos);
  reglas.validarFechaFutura(datos.fecha_hora);

  const ocupado = await citaRepository.existeEnHorario(
    datos.profesional_id,
    datos.fecha_hora
  );
  reglas.validarAgendaLibre(ocupado);

  const id = await citaRepository.guardar(datos);
  return { mensaje: 'Cita creada', id };
}

module.exports = { consultarCitas, consultarProfesionales, reservarCita };
*/
function crearCitaService({ citaRepository,
  reloj = () => new Date() }) {
  verificarRepositorios({ citaRepository});
  return {
    consultarCitas: () => citaRepository.listarTodas(),
    consultarProfesionales: () => citaRepository.listarTodos(),
    reservarCita: async (datos) => {
      reglas.validarDatosCompletos(datos);
      reglas.validarFechaFutura(datos.fecha_hora, reloj());
      const ocupado = await citaRepository.existeEnHorario(
        datos.profesional_id, datos.fecha_hora
      );
      reglas.validarAgendaLibre(ocupado);
      const id = await citaRepository.guardar(datos);
      return { mensaje: 'Cita creada', id };
    }
  };
}
module.exports = { crearCitaService }
