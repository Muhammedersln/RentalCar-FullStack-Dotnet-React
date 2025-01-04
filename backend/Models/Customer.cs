using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [Phone]
        [StringLength(20)]
        public string Phone { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }

        [Required]
        [StringLength(20)]
        public string DriverLicense { get; set; }

        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        public ICollection<Rental> Rentals { get; set; }
    }
} 