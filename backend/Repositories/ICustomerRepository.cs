using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<Customer> GetCustomerByEmailAsync(string email);
        Task<IEnumerable<Customer>> GetCustomersByNameAsync(string searchTerm);
        Task<IEnumerable<Rental>> GetCustomerRentalsAsync(int customerId);
    }
} 