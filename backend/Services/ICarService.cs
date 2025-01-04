using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCarsAsync();
        Task<Car> GetCarByIdAsync(int id);
        Task<IEnumerable<Car>> GetAvailableCarsAsync();
        Task<IEnumerable<Car>> GetCarsByBrandAsync(string brand);
        Task<Car> CreateCarAsync(Car car);
        Task<Car> UpdateCarAsync(int id, Car car);
        Task DeleteCarAsync(int id);
        Task<bool> IsCarAvailableAsync(int id);
        Task<decimal> GetDailyRateAsync(int id);
    }
} 