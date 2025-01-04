using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(c => c.Email.ToLower() == email.ToLower());
        }

        public async Task<IEnumerable<Customer>> GetCustomersByNameAsync(string searchTerm)
        {
            return await _dbSet
                .Where(c => c.FirstName.ToLower().Contains(searchTerm.ToLower()) || 
                           c.LastName.ToLower().Contains(searchTerm.ToLower()))
                .ToListAsync();
        }

        public async Task<IEnumerable<Rental>> GetCustomerRentalsAsync(int customerId)
        {
            var customer = await _dbSet
                .Include(c => c.Rentals)
                .ThenInclude(r => r.Car)
                .FirstOrDefaultAsync(c => c.Id == customerId);

            return customer?.Rentals ?? new List<Rental>();
        }

        public override async Task<Customer> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(c => c.Rentals)
                .ThenInclude(r => r.Car)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
} 