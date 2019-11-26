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
    public class AccionController : ControllerBase
    {
        private readonly SoftwareContext _context;
        public AccionController(SoftwareContext context)
        {
            _context = context;


            if (_context.Acciones.Count() == 0)
            {
            }
        }

        // Aqu�, despues del constructor de la clase, ir�n los M�todos HTTP GET,POST, DELETE, PUT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Accion>>> GetAcciones()
        {
            return await _context.Acciones.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Accion>> GetAccion(int id)
        {
            //prueba linq
            var accion =  await _context.Acciones.FindAsync(id);
            if (accion == null)
            {
                return NotFound();
            }
            return accion;
        }
   
        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Accion>> PostAccion(Accion accion)
        {

            
            _context.Acciones.Add(accion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAccion), new { id = accion.IdAccion }, accion);

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlan(int id, Accion item)
        {
            if (id != item.IdAccion)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var accion = await _context.Acciones.FindAsync(id);
            if (accion == null)
            {
                return NotFound();
            }

            _context.Acciones.Remove(accion);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
