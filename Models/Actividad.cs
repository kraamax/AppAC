using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
namespace AppAC.Models
{
    public class Actividad
    {
        [Key]
        public int IdActividad{get; set;}
        public string NombreActividad { get; set; }
        public int DocenteId { get; set; }
        public Docente Docente { get; set; }
        public int HorasAsignadas { get; set; }
        public string FechaAsignada{get; set;}
        
    }
}