using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalController : ControllerBase
    {
        private readonly IRentalService _rentalService;

        public RentalController(IRentalService rentalService)
        {
            _rentalService = rentalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentals()
        {
            var rentals = await _rentalService.GetAllRentalsAsync();
            return Ok(rentals);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(int id)
        {
            try
            {
                var rental = await _rentalService.GetRentalByIdAsync(id);
                return Ok(rental);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetActiveRentals()
        {
            var rentals = await _rentalService.GetActiveRentalsAsync();
            return Ok(rentals);
        }

        [HttpGet("overdue")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetOverdueRentals()
        {
            var rentals = await _rentalService.GetOverdueRentalsAsync();
            return Ok(rentals);
        }

        [HttpGet("date-range")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalsByDateRange(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                var rentals = await _rentalService.GetRentalsByDateRangeAsync(startDate, endDate);
                return Ok(rentals);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Rental>> CreateRental(Rental rental)
        {
            try
            {
                var createdRental = await _rentalService.CreateRentalAsync(rental);
                return CreatedAtAction(nameof(GetRental), new { id = createdRental.Id }, createdRental);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentNullException)
            {
                return BadRequest("Invalid rental data.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRental(int id, Rental rental)
        {
            try
            {
                var updatedRental = await _rentalService.UpdateRentalAsync(id, rental);
                return Ok(updatedRental);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentNullException)
            {
                return BadRequest("Invalid rental data.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            try
            {
                await _rentalService.DeleteRentalAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{id}/complete")]
        public async Task<ActionResult<Rental>> CompleteRental(int id, [FromBody] DateTime actualReturnDate)
        {
            try
            {
                var rental = await _rentalService.CompleteRentalAsync(id, actualReturnDate);
                return Ok(rental);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("car/{carId}/availability")]
        public async Task<ActionResult<bool>> CheckCarAvailability(
            int carId,
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                var isAvailable = await _rentalService.IsCarAvailableForRentalAsync(carId, startDate, endDate);
                return Ok(isAvailable);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("calculate-cost")]
        public async Task<ActionResult<decimal>> CalculateRentalCost(
            [FromQuery] int carId,
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                var cost = await _rentalService.CalculateRentalCostAsync(carId, startDate, endDate);
                return Ok(cost);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
} 