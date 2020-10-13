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
    public class AlumnoesController : ControllerBase
    {
        private readonly gimnasioContext _context;

        public AlumnoesController(gimnasioContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumno()
        {
            try
            {
                return Ok(await _context.Alumno.ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Alumnoes/5
        [HttpGet("{id}", Name = "GetAlumno")]
        public async Task<ActionResult<Alumno>> GetAlumno(int id)
        {
            try
            {
                var alumno = await _context.Alumno.FindAsync(id);

                if (alumno == null)
                {
                    return NotFound();
                }

                return Ok(alumno);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Alumnoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlumno(int id, [FromBody] Alumno alumno)
        {
            if (id != alumno.IdAlumno)
            {
                return BadRequest();
            }

            _context.Entry(alumno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlumnoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAlumno", new { id = alumno.IdAlumno }, alumno);
        }

        // POST: api/Alumnoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Alumno>> PostAlumno([FromBody] Alumno alumno)
        {

            try
            {

                _context.Alumno.Add(alumno);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetAlumno", new { id = alumno.IdAlumno }, alumno);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Alumnoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Alumno>> DeleteAlumno(int id)
        {
            try
            {
                var alumno = await _context.Alumno.FindAsync(id);
                if (alumno == null)
                {
                    return NotFound();
                }

                _context.Alumno.Remove(alumno);
                await _context.SaveChangesAsync();
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private bool AlumnoExists(int id)
        {
            return _context.Alumno.Any(e => e.IdAlumno == id);
        }
    }
}
