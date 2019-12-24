    using AppAC.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System;
namespace AppAC.Controllers
{

    [Route("api/[controller]")]
[ApiController]
public class AperturaController : ControllerBase
    {
        private readonly SoftwareContext _context;
        public AperturaController(SoftwareContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Apertura>> GetApertura(int id)
        {
            //prueba linq
            var apertura = await _context.Aperturas.FindAsync(id);
            if (apertura == null)
            {
                return NotFound();
            }
                return apertura;
        }

           [HttpGet("estado")]
         public async Task<ActionResult<Apertura>> GetCurrentApertura()
        {
          
            var apertura = await _context.Aperturas.FirstOrDefaultAsync(t=>t.Estado.Equals("Activo"));
            if (apertura == null)
            {
                return NotFound();
            }
                return apertura;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Apertura>> PostApertura(Apertura item)
        {
            _context.Aperturas.Add(item);
            await _context.SaveChangesAsync();
       
            return CreatedAtAction(nameof(GetApertura), new { id = item.IdApertura }, item);
        
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutApertura(int id, Apertura item)
        {
            if (id != item.IdApertura)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApertura(int id)
        {
            var apertura = await _context.Aperturas.FindAsync(id);
            if (apertura == null)
            {
                return NotFound();
            }

            _context.Aperturas.Remove(apertura);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
