using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using AppAC.Models;
namespace AppAC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadController : ControllerBase
    {
        private readonly SoftwareContext _context;
        public ActividadController(SoftwareContext context)
        {
            _context = context;
            if (_context.Actividades.Count() == 0)
            {
                Departamento departamento = new Departamento();

             
                departamento.NombreDepartamento = "Programacion 1";
                Docente docente = new Docente();
                docente.IdDocente = 4;
                docente.Nombres = "juan carlos";
                docente.Apellidos = "Molina escobar";
                docente.Departamento = departamento;
                docente.Sexo = "Masculino";
                docente.Telefono = "33333333";
                docente.Password = "" + docente.IdDocente;
                docente.Usuario = "" + docente.IdDocente;
                docente.Email = "juancame042@gmail.com";


                // Crea un nuevo item si la coleccion esta vacia,
                // lo que significa que no puedes borrar todos los Items.
                _context.Actividades.Add(new Actividad { NombreActividad = "Tutoria", Estado="Asignada", Docente = docente, FechaAsignacion =DateTime.Parse("28/02/2019"), HorasAsignadas = 3 });
                _context.SaveChanges();





            }
        }

        // Aquí, despues del constructor de la clase, irán los Métodos HTTP GET,POST, DELETE, PUT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actividad>>> GetActividades()
        {
            return await _context.Actividades.Include(t => t.Docente).ThenInclude(t=>t.Departamento).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Actividad>> GetActividadItem(int id)
        {
            //prueba linq
            var actividad = await _context.Actividades.Include(t => t.Docente).FirstOrDefaultAsync(i => i.IdActividad == id);
            if (actividad == null)
            {
                return NotFound();
            }
            return actividad;
        }
      [HttpGet("Docente={idDocente}")]
        public async Task<ActionResult<IEnumerable<Actividad>>> GetActividadesDocente(int idDocente)
        {
           return await _context.Actividades.Include(t => t.Docente).ThenInclude(t=>t.Departamento).Where(i=>i.DocenteId==idDocente).ToListAsync();
        }
         [HttpGet("departamento={idDepartamento}")]
        public async Task<ActionResult<IEnumerable<Actividad>>> GetActividadesByDepartamento(int idDepartamento)
        {
           return await _context.Actividades.Include(t => t.Docente).ThenInclude(t=>t.Departamento).Where(i=>i.Docente.DepartamentoId==idDepartamento).ToListAsync();
        }
           [HttpGet("Dpto={idDpto}")]
        public async Task<ActionResult<IEnumerable<Actividad>>> GetActividadesDpto(int idDpto)
        {
           return await _context.Actividades.Include(t => t.Docente).ThenInclude(t=>t.Departamento).Where(i=>i.Docente.DepartamentoId==idDpto).ToListAsync();
        }
        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Actividad>> PostActividadItem(Actividad item)
        {
            if(item.Docente!=null){
                item.DocenteId=item.Docente.IdDocente;
                item.Docente=null;

            }
         
            _context.Actividades.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetActividadItem), new { id = item.IdActividad }, item);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActividadItem(int id, Actividad
        item)
        {
            if (id != item.IdActividad)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActividadItem(int id)
        {
            var actividad = await _context.Actividades.FindAsync(id);
            if (actividad == null)
            {
                return NotFound();
            }

            _context.Actividades.Remove(actividad);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}