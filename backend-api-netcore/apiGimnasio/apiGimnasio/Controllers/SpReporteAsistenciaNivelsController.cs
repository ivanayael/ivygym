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
    public class SpReporteAsistenciaNivelsController : ControllerBase
    {
        private readonly gimnasioContext _context;

        public SpReporteAsistenciaNivelsController(gimnasioContext context)
        {
            _context = context;
        }

        // GET: api/SpReporteAsistenciaNivels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpReporteAsistenciaNivel>>> GetSpReporteAsistenciaNivel()
        {
            try
            {
                return Ok(await _context.SpReporteAsistenciaNivel.FromSqlRaw($"EXEC SpReporteAsistenciaNivel").ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        private bool SpReporteAsistenciaNivelExists(int id)
        {
            return _context.SpReporteAsistenciaNivel.FromSqlRaw($"EXEC SpReporteAsistenciaNivel").Any(e => e.IdAlumno == id);
        }
    }
}
