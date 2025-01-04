using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface ICarRepository : IRepository<Car>
    {
        Task<IEnumerable<Car>> GetAvailableCarsAsync();
        Task<IEnumerable<Car>> GetCarsByBrandAsync(string brand);
        Task<decimal> GetDailyRateAsync(int carId);
    }
} 