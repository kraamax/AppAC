namespace AppAC.Controllers
{
    using AppAC.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
[ApiController]
public class DocenteController : ControllerBase
    {
        private readonly SoftwareContext _context;
        Departamento departamento = new Departamento();


        public DocenteController(SoftwareContext context)
        {
            _context = context;
       
            departamento.NombreDepartamento = "Programacion 1";

            if (_context.Docentes.Count() == 0)
            {
            
                Docente docente= new Docente();
                docente.IdDocente=1;
                docente.Nombres= "juan carlos";
                docente.Apellidos="Molina escobar";
                //docente.Departamento=departamento;
                docente.DepartamentoId=1;
                docente.Sexo="Masculino";
                docente.Telefono="33333333";
                docente.Password=""+docente.IdDocente;
                docente.Usuario=""+docente.IdDocente;
                docente.Email="juancame042@gmail.com";
      
                _context.Docentes.Add(docente);
                _context.SaveChanges();
            }
        }

        // Aqu�, despues del constructor de la clase, ir�n los M�todos HTTP GET,POST, DELETE, PUT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Docente>>> GetDocentes()
        {
                    return await _context.Docentes.Include(t =>t.Departamento).ToListAsync();
        }

  [HttpGet("Departamento={idDepartamento}")]
        public async Task<ActionResult<IEnumerable<Docente>>> GetDocentes(int idDepartamento)
        {
                    return await _context.Docentes.Where(t=>t.DepartamentoId==idDepartamento).Include(t =>t.Departamento).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Docente>> GetDocenteItem(int id)
        {
            //prueba linq
            var docente = await _context.Docentes.Include(t =>t.Departamento).FirstOrDefaultAsync(i=>i.IdDocente==id);
            if (docente == null)
            {
                return NotFound();
            }
                return docente;
        }
        [HttpGet("doc={idDocente}/Dpto={idDpto}")]
          public async Task<ActionResult<Docente>> GetDocenteDpto(int idDocente,int idDpto)
        {
            //prueba linq
            var docente = await _context.Docentes.Include(t =>t.Departamento).FirstOrDefaultAsync(i=>i.IdDocente==idDocente && i.DepartamentoId==idDpto);
            if (docente == null)
            {
                return NotFound();
            }
                return docente;
        }
            [HttpGet("user={user}")]
          public async Task<ActionResult<Docente>> GetUserDocente(string user)
        {
            //prueba linq
            var docente = await _context.Docentes.Include(t =>t.Departamento).FirstOrDefaultAsync(i=>i.Usuario==user);
            if (docente == null)
            {
                return NotFound();
            }
                return docente;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Docente>> PostDocenteItem(Docente item)
        {
            
            item.Usuario = "" + item.IdDocente;
            item.Password = "" + item.IdDocente;
              
                item.DepartamentoId=item.Departamento.IdDepartamento;
                item.Departamento=null;


            _context.Docentes.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDocenteItem), new { id = item.IdDocente }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocenteItem(int id, Docente item)
        {
            if (id != item.IdDocente)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocenteItem(int id)
        {
            var docente = await _context.Docentes.FindAsync(id);
            if (docente == null)
            {
                return NotFound();
            }

            _context.Docentes.Remove(docente);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
