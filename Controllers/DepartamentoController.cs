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
public class DepartamentoController : ControllerBase
    {
        private readonly SoftwareContext _context;
      


        public DepartamentoController(SoftwareContext context)
        {
            _context = context;
         

            if (_context.Departamentos.Count() == 0)
            {
            
            
            }
        }

        // Aqu�, despues del constructor de la clase, ir�n los M�todos HTTP GET,POST, DELETE, PUT
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Departamento>>> GetDepartamentos()
        {
                    return await _context.Departamentos.ToListAsync();
        }

  
        [HttpGet("{id}")]
        public async Task<ActionResult<Departamento>> GetDptoItem(int id)
        {
            //prueba linq
            var dpto = await _context.Departamentos.FirstOrDefaultAsync(i=>i.IdDepartamento==id);
            if (dpto == null)
            {
                return NotFound();
            }
                return dpto;
        }

       
    }
}
