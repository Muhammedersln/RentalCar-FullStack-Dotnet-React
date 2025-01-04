using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Rental
    {
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }
        public Car Car { get; set; }

        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        [Required]
        public DateTime RentalDate { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        public DateTime? ActualReturnDate { get; set; }

        [Required]
        public decimal TotalCost { get; set; }

        public RentalStatus Status { get; set; } = RentalStatus.Active;

        [StringLength(500)]
        public string Notes { get; set; }
    }

    public enum RentalStatus
    {
        Active,
        Completed,
        Cancelled,
        Overdue
    }
} 