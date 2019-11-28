using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AppAC.Models
{
    public class Accion
    {
        
        [Key]
        public int IdAccion { get; set; }
        public string AccionPlaneada { get; set; }
        public int PlanAccionesId { get; set; }
        public string AccionRealizada{ get; set; }
        public string Evidencia { get; set; }

    }
}
