using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System;
namespace AppAC.Models
{
    public class Apertura
    {
        [Key]
        public int IdApertura { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string Estado { get; set; }

    }
}