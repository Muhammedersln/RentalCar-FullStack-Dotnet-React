using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface IRentalRepository : IRepository<Rental>
    {
        Task<IEnumerable<Rental>> GetActiveRentalsAsync();
        Task<IEnumerable<Rental>> GetOverdueRentalsAsync();
        Task<IEnumerable<Rental>> GetRentalsByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<bool> IsCarAvailableAsync(int carId, DateTime startDate, DateTime endDate);
    }
} 