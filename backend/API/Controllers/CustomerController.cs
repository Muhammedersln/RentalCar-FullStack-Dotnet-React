using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _customerService.GetAllCustomersAsync();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            try
            {
                var customer = await _customerService.GetCustomerByIdAsync(id);
                return Ok(customer);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<Customer>> GetCustomerByEmail(string email)
        {
            try
            {
                var customer = await _customerService.GetCustomerByEmailAsync(email);
                if (customer == null)
                    return NotFound();
                return Ok(customer);
            }
            catch (System.ArgumentException)
            {
                return BadRequest("Email cannot be empty.");
            }
        }

        [HttpGet("search/{searchTerm}")]
        public async Task<ActionResult<IEnumerable<Customer>>> SearchCustomers(string searchTerm)
        {
            try
            {
                var customers = await _customerService.GetCustomersByNameAsync(searchTerm);
                return Ok(customers);
            }
            catch (System.ArgumentException)
            {
                return BadRequest("Search term cannot be empty.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
        {
            try
            {
                var createdCustomer = await _customerService.CreateCustomerAsync(customer);
                return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.Id }, createdCustomer);
            }
            catch (System.ArgumentNullException)
            {
                return BadRequest("Invalid customer data.");
            }
            catch (System.InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            try
            {
                var updatedCustomer = await _customerService.UpdateCustomerAsync(id, customer);
                return Ok(updatedCustomer);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (System.ArgumentNullException)
            {
                return BadRequest("Invalid customer data.");
            }
            catch (System.InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                await _customerService.DeleteCustomerAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/rentals")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetCustomerRentals(int id)
        {
            try
            {
                var rentals = await _customerService.GetCustomerRentalsAsync(id);
                return Ok(rentals);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
} 