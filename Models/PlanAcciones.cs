using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAC.Models
{
    public class PlanTrabajo
    {
        public string Compromiso { get; set; }
        public Docente Resoponsable { get; set; }
        public string Fecha { get; set; }
        public Actividad Actividad { get; set; }

    }
}
