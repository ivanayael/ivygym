using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace apiGimnasio.Models
{
    public class SpReporteAsistenciaNivel
    {

        [Column("nivel")]
        [StringLength(50)]
        public string Nivel { get; set; }

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

        [Column("dias_practica")]
        [StringLength(50)]
        public string DiasPractica { get; set; }

        [Column("asistencia_1")]
        public bool? Asistencia1 { get; set; }
        [Column("asistencia_2")]
        public bool? Asistencia2 { get; set; }
        [Column("asistencia_3")]
        public bool? Asistencia3 { get; set; }
        [Column("asistencia_4")]
        public bool? Asistencia4 { get; set; }
    }
}
