using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAC.Models
{
    public class DescripcionAccionRealizada
    
    {
        public int IdDescripcion { get; set; }
        public Accion Accion { get; set; }
        public string Descripcion { get; set; }

    }
}
