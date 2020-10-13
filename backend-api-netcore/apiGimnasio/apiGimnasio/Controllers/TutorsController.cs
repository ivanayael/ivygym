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
    public class TutorsController : ControllerBase
    {
        private readonly gimnasioContext _context;

        public TutorsController(gimnasioContext context)
        {
            _context = context;
        }

        // GET: api/Tutors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tutor>>> GetTutor()
        {
            try
            {
                return Ok(await _context.Tutor.ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Tutors/5
        [HttpGet("{id}", Name = "GetTutor")]
        public async Task<ActionResult<Tutor>> GetTutor(int id)
        {
            try
            {
                var tutor = await _context.Tutor.FindAsync(id);

                if (tutor == null)
                {
                    return NotFound();
                }

                return Ok(tutor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Tutors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTutor(int id, [FromBody] Tutor tutor)
        {
            if (id != tutor.IdTutor)
            {
                return BadRequest();
            }

            _context.Entry(tutor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TutorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTutor", new { id = tutor.IdTutor }, tutor);
        }

        // POST: api/Tutors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Tutor>> PostTutor([FromBody] Tutor tutor)
        {
            try
            {
                _context.Tutor.Add(tutor);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTutor", new { id = tutor.IdTutor }, tutor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Tutors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tutor>> DeleteTutor(int id)
        {
            try
            {
                var tutor = await _context.Tutor.FindAsync(id);
                if (tutor == null)
                {
                    return NotFound();
                }

                _context.Tutor.Remove(tutor);
                await _context.SaveChangesAsync();

                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        private bool TutorExists(int id)
        {
            return _context.Tutor.Any(e => e.IdTutor == id);
        }
    }
}
