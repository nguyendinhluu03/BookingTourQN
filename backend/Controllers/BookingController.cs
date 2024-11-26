using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLBooking.Data;
using QLBooking.Models;

namespace QLBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public BookingController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/DanhMuc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            return await _context.Booking.ToListAsync();
        }

        // GET: api/Booking/Top5
        [HttpGet("Top5")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetTop5Bookings()
        {
            var top5Bookings = await _context.Booking
                .OrderByDescending(b => b.Count) // Sắp xếp theo Count giảm dần
                .Take(5) // Lấy 5 bản ghi đầu tiên
                .ToListAsync();

            return top5Bookings;
        }
    }
}
