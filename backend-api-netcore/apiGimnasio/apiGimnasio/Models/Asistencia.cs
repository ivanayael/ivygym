using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiGimnasio.Models
{
    [Table("asistencia")]
    public partial class Asistencia
    {
        [Key]
        [Column("id_asistencia")]
        public int IdAsistencia { get; set; }
        [Column("dni")]
        public int Dni { get; set; }
        [Column("asistencia_1")]
        public bool? Asistencia1 { get; set; }
        [Column("asistencia_2")]
        public bool? Asistencia2 { get; set; }
        [Column("asistencia_3")]
        public bool? Asistencia3 { get; set; }
        [Column("asistencia_4")]
        public bool? Asistencia4 { get; set; }
        [Column("pago_mensual", TypeName = "decimal(18, 0)")]
        public decimal? PagoMensual { get; set; }
        [Column("pago_fecha", TypeName = "date")]
        public DateTime? PagoFecha { get; set; }
        [Column("pago_realizado")]
        public bool? PagoRealizado { get; set; }
    }
}
