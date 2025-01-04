using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class RentalRepository : Repository<Rental>, IRentalRepository
    {
        public RentalRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Rental>> GetActiveRentalsAsync()
        {
            return await _dbSet
                .Include(r => r.Car)
                .Include(r => r.Customer)
                .Where(r => r.Status == RentalStatus.Active)
                .ToListAsync();
        }

        public async Task<IEnumerable<Rental>> GetOverdueRentalsAsync()
        {
            var currentDate = DateTime.Now;
            return await _dbSet
                .Include(r => r.Car)
                .Include(r => r.Customer)
                .Where(r => r.Status == RentalStatus.Active && r.ReturnDate < currentDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Rental>> GetRentalsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _dbSet
                .Include(r => r.Car)
                .Include(r => r.Customer)
                .Where(r => r.RentalDate >= startDate && r.ReturnDate <= endDate)
                .ToListAsync();
        }

        public async Task<bool> IsCarAvailableAsync(int carId, DateTime startDate, DateTime endDate)
        {
            var overlappingRentals = await _dbSet
                .Where(r => r.CarId == carId &&
                           r.Status == RentalStatus.Active &&
                           ((r.RentalDate <= startDate && r.ReturnDate >= startDate) ||
                            (r.RentalDate <= endDate && r.ReturnDate >= endDate) ||
                            (r.RentalDate >= startDate && r.ReturnDate <= endDate)))
                .AnyAsync();

            return !overlappingRentals;
        }

        public override async Task<Rental> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(r => r.Car)
                .Include(r => r.Customer)
                .FirstOrDefaultAsync(r => r.Id == id);
        }
    }
} 