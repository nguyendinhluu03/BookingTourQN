using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLBooking.Models
{
    [Table("Booking")]
    public class Booking
    {
        [Key]
        public int Id_booking { get; set; }
        public int IDTour { get; set; }
        public DateTime DateTime { get; set; }
        public int Count { get; set; }
    }
}
