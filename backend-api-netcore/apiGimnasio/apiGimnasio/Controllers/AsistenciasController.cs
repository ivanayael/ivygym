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
    public class AsistenciasController : ControllerBase
    {
        private readonly gimnasioContext _context;

        public AsistenciasController(gimnasioContext context)
        {
            _context = context;
        }

       // GET: api/Asistencias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asistencia>>> GetAsistencia()
        {
            return await _context.Asistencia.ToListAsync();
        }

        // GET: api/Asistencias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asistencia>> GetAsistencia(int id)
        {
            var asistencia = await _context.Asistencia.FindAsync(id);

            if (asistencia == null)
            {
                return NotFound();
            }

            return Ok(asistencia);
        }

        // PUT: api/Asistencias/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsistencia(int id, [FromBody] Asistencia asistencia)
        {
            if (id != asistencia.IdAsistencia)
            {
                return BadRequest();
            }

            _context.Entry(asistencia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsistenciaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAsistencia", new { id = asistencia.IdAsistencia }, asistencia);
        }

        // POST: api/Asistencias
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Asistencia>> PostAsistencia([FromBody] Asistencia asistencia)
        {
            _context.Asistencia.Add(asistencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsistencia", new { id = asistencia.IdAsistencia }, asistencia);
        }

        // DELETE: api/Asistencias/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Asistencia>> DeleteAsistencia(int id)
        {
            var asistencia = await _context.Asistencia.FindAsync(id);
            if (asistencia == null)
            {
                return NotFound();
            }

            _context.Asistencia.Remove(asistencia);
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        private bool AsistenciaExists(int id)
        {
            return _context.Asistencia.Any(e => e.IdAsistencia == id);
        }
    }
}