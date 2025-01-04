using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            return await _customerRepository.GetAllAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null)
                throw new KeyNotFoundException($"Customer with ID {id} not found.");
            return customer;
        }

        public async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty.");
            return await _customerRepository.GetCustomerByEmailAsync(email);
        }

        public async Task<IEnumerable<Customer>> GetCustomersByNameAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                throw new ArgumentException("Search term cannot be empty.");
            return await _customerRepository.GetCustomersByNameAsync(searchTerm);
        }

        public async Task<Customer> CreateCustomerAsync(Customer customer)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            var existingCustomer = await _customerRepository.GetCustomerByEmailAsync(customer.Email);
            if (existingCustomer != null)
                throw new InvalidOperationException($"Customer with email {customer.Email} already exists.");

            await _customerRepository.AddAsync(customer);
            await _customerRepository.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer> UpdateCustomerAsync(int id, Customer customer)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            var existingCustomer = await _customerRepository.GetByIdAsync(id);
            if (existingCustomer == null)
                throw new KeyNotFoundException($"Customer with ID {id} not found.");

            // Check if email is being changed and if new email is already in use
            if (existingCustomer.Email != customer.Email)
            {
                var customerWithNewEmail = await _customerRepository.GetCustomerByEmailAsync(customer.Email);
                if (customerWithNewEmail != null)
                    throw new InvalidOperationException($"Email {customer.Email} is already in use.");
            }

            existingCustomer.FirstName = customer.FirstName;
            existingCustomer.LastName = customer.LastName;
            existingCustomer.Email = customer.Email;
            existingCustomer.Phone = customer.Phone;
            existingCustomer.Address = customer.Address;
            existingCustomer.DriverLicense = customer.DriverLicense;

            await _customerRepository.UpdateAsync(existingCustomer);
            await _customerRepository.SaveChangesAsync();
            return existingCustomer;
        }

        public async Task DeleteCustomerAsync(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null)
                throw new KeyNotFoundException($"Customer with ID {id} not found.");

            await _customerRepository.DeleteAsync(customer);
            await _customerRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Rental>> GetCustomerRentalsAsync(int id)
        {
            if (!await _customerRepository.ExistsAsync(id))
                throw new KeyNotFoundException($"Customer with ID {id} not found.");

            return await _customerRepository.GetCustomerRentalsAsync(id);
        }
    }
} 