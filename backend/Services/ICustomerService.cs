using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetAllCustomersAsync();
        Task<Customer> GetCustomerByIdAsync(int id);
        Task<Customer> GetCustomerByEmailAsync(string email);
        Task<IEnumerable<Customer>> GetCustomersByNameAsync(string searchTerm);
        Task<Customer> CreateCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerAsync(int id, Customer customer);
        Task DeleteCustomerAsync(int id);
        Task<IEnumerable<Rental>> GetCustomerRentalsAsync(int id);
    }
} 