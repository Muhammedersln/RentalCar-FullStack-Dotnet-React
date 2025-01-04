using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            var cars = await _carService.GetAllCarsAsync();
            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            try
            {
                var car = await _carService.GetCarByIdAsync(id);
                return Ok(car);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<Car>>> GetAvailableCars()
        {
            var cars = await _carService.GetAvailableCarsAsync();
            return Ok(cars);
        }

        [HttpGet("brand/{brand}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCarsByBrand(string brand)
        {
            try
            {
                var cars = await _carService.GetCarsByBrandAsync(brand);
                return Ok(cars);
            }
            catch (System.ArgumentException)
            {
                return BadRequest("Brand name cannot be empty.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Car>> CreateCar(Car car)
        {
            try
            {
                var createdCar = await _carService.CreateCarAsync(car);
                return CreatedAtAction(nameof(GetCar), new { id = createdCar.Id }, createdCar);
            }
            catch (System.ArgumentNullException)
            {
                return BadRequest("Invalid car data.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCar(int id, Car car)
        {
            try
            {
                var updatedCar = await _carService.UpdateCarAsync(id, car);
                return Ok(updatedCar);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (System.ArgumentNullException)
            {
                return BadRequest("Invalid car data.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            try
            {
                await _carService.DeleteCarAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/available")]
        public async Task<ActionResult<bool>> IsCarAvailable(int id)
        {
            try
            {
                var isAvailable = await _carService.IsCarAvailableAsync(id);
                return Ok(isAvailable);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/daily-rate")]
        public async Task<ActionResult<decimal>> GetDailyRate(int id)
        {
            var dailyRate = await _carService.GetDailyRateAsync(id);
            return Ok(dailyRate);
        }
    }
} 