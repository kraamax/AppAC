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
public class JefeDepartamentoController : ControllerBase
    {
        private readonly SoftwareContext _context;
        Departamento departamento = new Departamento();


        public JefeDepartamentoController(SoftwareContext context)
        {
            _context = context;
            
            departamento.NombreDepartamento = "Ingenieria de Sistemas";

            if (_context.JefeDepartamentos.Count() == 0)
            {
            
                JefeDepartamento jefeDepartamento= new JefeDepartamento();
                jefeDepartamento.IdJefeDpto=1;
                jefeDepartamento.Nombres= "Pedro";
                jefeDepartamento.Apellidos="Gonzales";
                jefeDepartamento.DepartamentoId=1;
                //jefeDepartamento.Departamento=departamento;
                jefeDepartamento.Sexo="Masculino";
                jefeDepartamento.Telefono="33333333";
                jefeDepartamento.Password=""+jefeDepartamento.IdJefeDpto;
                jefeDepartamento.Usuario=""+jefeDepartamento.IdJefeDpto;
                jefeDepartamento.Email="predrog@gmail.com";
      
                _context.JefeDepartamentos.Add(jefeDepartamento);
                _context.SaveChanges();
            }
        }

        // Aqu�, despues del constructor de la clase, ir�n los M�todos HTTP GET,POST, DELETE, PUT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JefeDepartamento>>> GetJefesDptos()
        {
                    return await _context.JefeDepartamentos.Include(t =>t.Departamento).ToListAsync();
        }

  [HttpGet("Departamento={idDepartamento}")]
        public async Task<ActionResult<IEnumerable<JefeDepartamento>>> GetJefesDptos(int idDepartamento)
        {
                    return await _context.JefeDepartamentos.Where(t=>t.DepartamentoId==idDepartamento).Include(t =>t.Departamento).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<JefeDepartamento>> GetjefeDptoItem(int id)
        {
            //prueba linq
            var jefeDepartamento = await _context.JefeDepartamentos.Include(t =>t.Departamento).FirstOrDefaultAsync(i=>i.IdJefeDpto==id);
            if (jefeDepartamento == null)
            {
                return NotFound();
            }
                return jefeDepartamento;
        }
           [HttpGet("user={user}")]
         public async Task<ActionResult<JefeDepartamento>> GetjefeDptoByUser(string user)
        {
            //prueba linq
            var jefeDepartamento = await _context.JefeDepartamentos.Include(t =>t.Departamento).FirstOrDefaultAsync(i=>i.Usuario==user);
            if (jefeDepartamento == null)
            {
                return NotFound();
            }
                return jefeDepartamento;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<JefeDepartamento>> PostJefeDptoItem(JefeDepartamento item)
        {
            
            item.Usuario = "" + item.IdJefeDpto;
            item.Password = "" + item.IdJefeDpto;
          
                item.DepartamentoId=item.Departamento.IdDepartamento;
                item.Departamento=null;


            
            _context.JefeDepartamentos.Add(item);
            await _context.SaveChangesAsync();
       
            return CreatedAtAction(nameof(GetjefeDptoItem), new { id = item.IdJefeDpto }, item);
        
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutJefeDptoItem(int id, JefeDepartamento item)
        {
            if (id != item.IdJefeDpto)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJefeDptoItem(int id)
        {
            var jefeDpto = await _context.JefeDepartamentos.FindAsync(id);
            if (jefeDpto == null)
            {
                return NotFound();
            }

            _context.JefeDepartamentos.Remove(jefeDpto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
