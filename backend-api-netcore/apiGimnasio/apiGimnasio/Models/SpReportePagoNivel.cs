using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiGimnasio.Models
{
    public class SpReportePagoNivel
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

        [Column("valor", TypeName = "decimal(18, 0)")]
        public decimal? Valor { get; set; }

        [Column("pago_fecha", TypeName = "date")]
        public DateTime? PagoFecha { get; set; }

        [Column("pago_mensual", TypeName = "decimal(18, 0)")]
        public decimal? PagoMensual { get; set; }
      
        [Column("pago_realizado")]
        public bool? PagoRealizado { get; set; }
    }
}
