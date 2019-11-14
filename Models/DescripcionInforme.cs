using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppAC.Models
{
    public class DescripcionAccionesRealizadas
    
    {
        public int IdDescripcion { get; set; }
        public List<AccionRealizada> Acciones { get; set; }
        //public PlanTrabajo PlanTrabajo { get; set; }
        public Actividad Actividad { get; set; }

    }
}
