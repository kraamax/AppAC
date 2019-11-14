using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAC.Models
{
    public class AccionRealizada
    {
        public int IdAccion { get; set; }
        public string Descripcion { get; set; }
        public string Fecha { get; set; }
        public Evidencia Evidencia { get; set; }
    }
}
