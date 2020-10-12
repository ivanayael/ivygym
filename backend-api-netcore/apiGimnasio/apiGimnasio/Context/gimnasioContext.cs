using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace apiGimnasio.Models
{
    public partial class gimnasioContext : DbContext
    {
        public gimnasioContext()
        {
        }

        public gimnasioContext(DbContextOptions<gimnasioContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Alumno> Alumno { get; set; }
        public virtual DbSet<Asistencia> Asistencia { get; set; }
        public virtual DbSet<Tutor> Tutor { get; set; }

        public virtual DbSet<SpReporteAsistenciaNivel> SpReporteAsistenciaNivel { get; set; }

        public virtual DbSet<SpReportePagoNivel> SpReportePagoNivel { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-26PU5NL;Initial Catalog=gimnasia_artistica;Integrated Security=True; MultipleActiveResultSets=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Asistencia>(entity =>
            {
                entity.Property(e => e.PagoFecha).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Tutor>(entity =>
            {
                entity.HasOne(d => d.IdAlumnoNavigation)
                    .WithMany(p => p.Tutor)
                    .HasForeignKey(d => d.IdAlumno)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_tutor_alumno");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
