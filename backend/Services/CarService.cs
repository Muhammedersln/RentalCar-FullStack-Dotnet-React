using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;

        public CarService(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        public async Task<IEnumerable<Car>> GetAllCarsAsync()
        {
            return await _carRepository.GetAllAsync();
        }

        public async Task<Car> GetCarByIdAsync(int id)
        {
            var car = await _carRepository.GetByIdAsync(id);
            if (car == null)
                throw new KeyNotFoundException($"Car with ID {id} not found.");
            return car;
        }

        public async Task<IEnumerable<Car>> GetAvailableCarsAsync()
        {
            return await _carRepository.GetAvailableCarsAsync();
        }

        public async Task<IEnumerable<Car>> GetCarsByBrandAsync(string brand)
        {
            if (string.IsNullOrWhiteSpace(brand))
                throw new ArgumentException("Brand name cannot be empty.");
            return await _carRepository.GetCarsByBrandAsync(brand);
        }

        public async Task<Car> CreateCarAsync(Car car)
        {
            if (car == null)
                throw new ArgumentNullException(nameof(car));

            await _carRepository.AddAsync(car);
            await _carRepository.SaveChangesAsync();
            return car;
        }

        public async Task<Car> UpdateCarAsync(int id, Car car)
        {
            if (car == null)
                throw new ArgumentNullException(nameof(car));

            var existingCar = await _carRepository.GetByIdAsync(id);
            if (existingCar == null)
                throw new KeyNotFoundException($"Car with ID {id} not found.");

            existingCar.Brand = car.Brand;
            existingCar.Model = car.Model;
            existingCar.Year = car.Year;
            existingCar.LicensePlate = car.LicensePlate;
            existingCar.DailyRate = car.DailyRate;
            existingCar.IsAvailable = car.IsAvailable;
            existingCar.Description = car.Description;

            await _carRepository.UpdateAsync(existingCar);
            await _carRepository.SaveChangesAsync();
            return existingCar;
        }

        public async Task DeleteCarAsync(int id)
        {
            var car = await _carRepository.GetByIdAsync(id);
            if (car == null)
                throw new KeyNotFoundException($"Car with ID {id} not found.");

            await _carRepository.DeleteAsync(car);
            await _carRepository.SaveChangesAsync();
        }

        public async Task<bool> IsCarAvailableAsync(int id)
        {
            var car = await _carRepository.GetByIdAsync(id);
            if (car == null)
                throw new KeyNotFoundException($"Car with ID {id} not found.");
            return car.IsAvailable;
        }

        public async Task<decimal> GetDailyRateAsync(int id)
        {
            return await _carRepository.GetDailyRateAsync(id);
        }
    }
} 