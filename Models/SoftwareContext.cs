using Microsoft.EntityFrameworkCore;
namespace AppAC.Models
{
public class SoftwareContext : DbContext
{
    public SoftwareContext(DbContextOptions<SoftwareContext> options) :
        base(options)
         {
         }
        public DbSet<Docente> Docentes { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Actividad> Actividades { get; set; }
        public DbSet<JefeDepartamento> JefeDepartamentos { get; set; }
        public DbSet<Accion> Acciones { get; set; }
        public DbSet<PlanAcciones> Planes { get; set; }
        

}
}