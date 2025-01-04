using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CarRepository : Repository<Car>, ICarRepository
    {
        public CarRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Car>> GetAvailableCarsAsync()
        {
            return await _dbSet.Where(c => c.IsAvailable).ToListAsync();
        }

        public async Task<IEnumerable<Car>> GetCarsByBrandAsync(string brand)
        {
            return await _dbSet.Where(c => c.Brand.ToLower().Contains(brand.ToLower())).ToListAsync();
        }

        public async Task<decimal> GetDailyRateAsync(int carId)
        {
            var car = await _dbSet.FindAsync(carId);
            return car?.DailyRate ?? 0;
        }

        public override async Task<Car> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(c => c.Rentals)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
} 