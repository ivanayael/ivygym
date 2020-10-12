using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiGimnasio.Models
{
    [Table("tutor")]
    public partial class Tutor
    {
        [Key]
        [Column("id_tutor")]
        public int IdTutor { get; set; }
        [Required]
        [Column("nombre")]
        [StringLength(50)]
        public string Nombre { get; set; }
        [Required]
        [Column("apellido")]
        [StringLength(50)]
        public string Apellido { get; set; }
        [Column("dni")]
        public int Dni { get; set; }
        [Column("mail")]
        [StringLength(100)]
        public string Mail { get; set; }
        [Required]
        [Column("telefono")]
        [StringLength(100)]
        public string Telefono { get; set; }
        [Column("id_alumno")]
        public int? IdAlumno { get; set; }

        [ForeignKey(nameof(IdAlumno))]
        [InverseProperty(nameof(Alumno.Tutor))]
        public virtual Alumno IdAlumnoNavigation { get; set; }
    }
}
