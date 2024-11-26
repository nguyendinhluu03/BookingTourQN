using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using QLBooking.Models;
using QLBooking.Data;
using System;
using System.Linq;

namespace TourBookingSystem.Aspects
{
    public class LoggingActionFilter : IActionFilter
    {
        private readonly ILogger<LoggingActionFilter> _logger;
        private readonly ApplicationDbContext _context;

        public LoggingActionFilter(ILogger<LoggingActionFilter> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Check if the request is a POST request to /api/DonHangs
            if (context.HttpContext.Request.Method == "POST" && context.HttpContext.Request.Path.StartsWithSegments("/api/DonHangs"))
            {
                var request = context.ActionArguments["donHang"] as DonHang;  // Assuming DonHang is the model in the request
                if (request != null && request.IDTour > 0)
                {
                    // Check if there is an existing booking for this IDTour
                    var existingBooking = _context.Booking
                        .FirstOrDefault(b => b.IDTour == request.IDTour);

                    if (existingBooking != null)
                    {
                        // If a booking exists, increment the count
                        existingBooking.Count += 1;
                        _context.Booking.Update(existingBooking);
                    }
                    else
                    {
                        // If no booking exists for this IDTour, create a new booking
                        var newBooking = new Booking
                        {
                            IDTour = request.IDTour,
                            DateTime = DateTime.UtcNow,
                            Count = 1
                        };
                        _context.Booking.Add(newBooking);
                    }

                    // Save changes to the database
                    _context.SaveChanges();
                }
            }
        }

        // @After: Logic thực hiện sau khi hành động đã được thực thi
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Ví dụ: Ghi log sau khi hành động hoàn thành
            _logger.LogInformation("Action {ActionName} executed at {DateTime}", context.ActionDescriptor.DisplayName, DateTime.Now);
        }
    }
}