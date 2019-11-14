using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace AppAC.Models
{
    public class Departamento
    {
          [Key]
        public int IdDepartamento { get; set; }

        public string NombreDepartamento { get; set; }
    }
}