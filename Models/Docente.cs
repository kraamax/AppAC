using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AppAC.Models
{
    public class Docente
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        [JsonProperty("idDocente")]
        public int IdDocente { get; set; }
        [JsonProperty("nombres")]
        public string Nombres { get; set; }
        [JsonProperty("apellidos")]
        public string Apellidos { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("telefono")]
        public string Telefono { get; set; }
        [JsonProperty("sexo")]
        public string Sexo { get; set; }

    }
}