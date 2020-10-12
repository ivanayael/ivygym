using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiGimnasio.Models
{
    [Table("alumno")]
    public partial class Alumno
    {
        public Alumno()
        {
            Tutor = new HashSet<Tutor>();
        }

        [Key]
        [Column("id_alumno")]
        public int IdAlumno { get; set; }
        [Column("nombre")]
        [StringLength(50)]
        public string Nombre { get; set; }
        [Column("apellido")]
        [StringLength(50)]
        public string Apellido { get; set; }
        [Column("dni")]
        public int Dni { get; set; }
        [Column("fecha_nacimiento")]
        public DateTime? FechaNacimiento { get; set; }
        [Column("mail")]
        [StringLength(100)]
        public string Mail { get; set; }
        [Column("obrasocial")]
        [StringLength(50)]
        public string Obrasocial { get; set; }
        [Column("certificadomedico")]
        public string Certificadomedico { get; set; }
        [Column("numerosocio")]
        [StringLength(50)]
        public string Numerosocio { get; set; }
        [Column("nivel")]
        [StringLength(50)]
        public string Nivel { get; set; }
        [Column("categoria")]
        [StringLength(50)]
        public string Categoria { get; set; }
        [Column("edad")]
        public int? Edad { get; set; }
        [Column("dias_practica")]
        [StringLength(50)]
        public string DiasPractica { get; set; }
        [Column("valor", TypeName = "decimal(18, 0)")]
        public decimal? Valor { get; set; }

        [InverseProperty("IdAlumnoNavigation")]
        public virtual ICollection<Tutor> Tutor { get; set; }
    }
}
