using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class RentalService : IRentalService
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly ICarRepository _carRepository;
        private readonly ICustomerRepository _customerRepository;

        public RentalService(
            IRentalRepository rentalRepository,
            ICarRepository carRepository,
            ICustomerRepository customerRepository)
        {
            _rentalRepository = rentalRepository;
            _carRepository = carRepository;
            _customerRepository = customerRepository;
        }

        public async Task<IEnumerable<Rental>> GetAllRentalsAsync()
        {
            return await _rentalRepository.GetAllAsync();
        }

        public async Task<Rental> GetRentalByIdAsync(int id)
        {
            var rental = await _rentalRepository.GetByIdAsync(id);
            if (rental == null)
                throw new KeyNotFoundException($"Rental with ID {id} not found.");
            return rental;
        }

        public async Task<IEnumerable<Rental>> GetActiveRentalsAsync()
        {
            return await _rentalRepository.GetActiveRentalsAsync();
        }

        public async Task<IEnumerable<Rental>> GetOverdueRentalsAsync()
        {
            return await _rentalRepository.GetOverdueRentalsAsync();
        }

        public async Task<IEnumerable<Rental>> GetRentalsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
                throw new ArgumentException("Start date must be before end date.");

            return await _rentalRepository.GetRentalsByDateRangeAsync(startDate, endDate);
        }

        public async Task<Rental> CreateRentalAsync(Rental rental)
        {
            if (rental == null)
                throw new ArgumentNullException(nameof(rental));

            // Validate car exists and is available
            var car = await _carRepository.GetByIdAsync(rental.CarId);
            if (car == null)
                throw new KeyNotFoundException($"Car with ID {rental.CarId} not found.");
            if (!car.IsAvailable)
                throw new InvalidOperationException($"Car with ID {rental.CarId} is not available.");

            // Validate customer exists
            var customer = await _customerRepository.GetByIdAsync(rental.CustomerId);
            if (customer == null)
                throw new KeyNotFoundException($"Customer with ID {rental.CustomerId} not found.");

            // Check if car is available for the rental period
            var isAvailable = await _rentalRepository.IsCarAvailableAsync(rental.CarId, rental.RentalDate, rental.ReturnDate);
            if (!isAvailable)
                throw new InvalidOperationException($"Car with ID {rental.CarId} is not available for the specified period.");

            // Calculate total cost
            rental.TotalCost = await CalculateRentalCostAsync(rental.CarId, rental.RentalDate, rental.ReturnDate);
            rental.Status = RentalStatus.Active;

            // Update car availability
            car.IsAvailable = false;
            await _carRepository.UpdateAsync(car);

            await _rentalRepository.AddAsync(rental);
            await _rentalRepository.SaveChangesAsync();
            return rental;
        }

        public async Task<Rental> UpdateRentalAsync(int id, Rental rental)
        {
            if (rental == null)
                throw new ArgumentNullException(nameof(rental));

            var existingRental = await _rentalRepository.GetByIdAsync(id);
            if (existingRental == null)
                throw new KeyNotFoundException($"Rental with ID {id} not found.");

            // Only allow updates if rental is still active
            if (existingRental.Status != RentalStatus.Active)
                throw new InvalidOperationException("Cannot update a completed or cancelled rental.");

            existingRental.ReturnDate = rental.ReturnDate;
            existingRental.Notes = rental.Notes;
            existingRental.TotalCost = await CalculateRentalCostAsync(existingRental.CarId, existingRental.RentalDate, rental.ReturnDate);

            await _rentalRepository.UpdateAsync(existingRental);
            await _rentalRepository.SaveChangesAsync();
            return existingRental;
        }

        public async Task DeleteRentalAsync(int id)
        {
            var rental = await _rentalRepository.GetByIdAsync(id);
            if (rental == null)
                throw new KeyNotFoundException($"Rental with ID {id} not found.");

            // Only allow deletion if rental is not active
            if (rental.Status == RentalStatus.Active)
                throw new InvalidOperationException("Cannot delete an active rental.");

            await _rentalRepository.DeleteAsync(rental);
            await _rentalRepository.SaveChangesAsync();
        }

        public async Task<Rental> CompleteRentalAsync(int id, DateTime actualReturnDate)
        {
            var rental = await _rentalRepository.GetByIdAsync(id);
            if (rental == null)
                throw new KeyNotFoundException($"Rental with ID {id} not found.");

            if (rental.Status != RentalStatus.Active)
                throw new InvalidOperationException("Can only complete active rentals.");

            rental.ActualReturnDate = actualReturnDate;
            rental.Status = actualReturnDate > rental.ReturnDate ? RentalStatus.Overdue : RentalStatus.Completed;

            // Update car availability
            var car = await _carRepository.GetByIdAsync(rental.CarId);
            car.IsAvailable = true;
            await _carRepository.UpdateAsync(car);

            // Recalculate total cost if overdue
            if (rental.Status == RentalStatus.Overdue)
            {
                rental.TotalCost = await CalculateRentalCostAsync(rental.CarId, rental.RentalDate, actualReturnDate);
            }

            await _rentalRepository.UpdateAsync(rental);
            await _rentalRepository.SaveChangesAsync();
            return rental;
        }

        public async Task<bool> IsCarAvailableForRentalAsync(int carId, DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
                throw new ArgumentException("Start date must be before end date.");

            return await _rentalRepository.IsCarAvailableAsync(carId, startDate, endDate);
        }

        public async Task<decimal> CalculateRentalCostAsync(int carId, DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
                throw new ArgumentException("Start date must be before end date.");

            var dailyRate = await _carRepository.GetDailyRateAsync(carId);
            var days = (int)(endDate - startDate).TotalDays + 1; // Include both start and end dates
            return dailyRate * days;
        }
    }
} 