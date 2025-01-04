using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public interface IRentalService
    {
        Task<IEnumerable<Rental>> GetAllRentalsAsync();
        Task<Rental> GetRentalByIdAsync(int id);
        Task<IEnumerable<Rental>> GetActiveRentalsAsync();
        Task<IEnumerable<Rental>> GetOverdueRentalsAsync();
        Task<IEnumerable<Rental>> GetRentalsByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<Rental> CreateRentalAsync(Rental rental);
        Task<Rental> UpdateRentalAsync(int id, Rental rental);
        Task DeleteRentalAsync(int id);
        Task<Rental> CompleteRentalAsync(int id, DateTime actualReturnDate);
        Task<bool> IsCarAvailableForRentalAsync(int carId, DateTime startDate, DateTime endDate);
        Task<decimal> CalculateRentalCostAsync(int carId, DateTime startDate, DateTime endDate);
    }
} 