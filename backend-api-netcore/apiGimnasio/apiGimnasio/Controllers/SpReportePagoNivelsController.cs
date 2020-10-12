using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiGimnasio.Models;

namespace apiGimnasio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpReportePagoNivelsController : ControllerBase
    {
        private readonly gimnasioContext _context;

        public SpReportePagoNivelsController(gimnasioContext context)
        {
            _context = context;
        }

        // GET: api/SpReportePagoNivels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpReportePagoNivel>>> GetSpReportePagoNivel()
        {
            try
            {
                return Ok(await _context.SpReportePagoNivel.FromSqlRaw($"EXEC SpReportePagoNivel").ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        private bool SpReportePagoNivelExists(int id)
        {
            return _context.SpReportePagoNivel.FromSqlRaw($"EXEC SpReportePagoNivel").Any(e => e.IdAlumno == id);
        }
    }
}
