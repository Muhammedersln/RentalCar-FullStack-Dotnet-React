using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Brand { get; set; }

        [Required]
        [StringLength(50)]
        public string Model { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        [StringLength(20)]
        public string LicensePlate { get; set; }

        [Required]
        public decimal DailyRate { get; set; }

        public bool IsAvailable { get; set; } = true;

        [StringLength(500)]
        public string Description { get; set; }

        public ICollection<Rental> Rentals { get; set; }
    }
} 