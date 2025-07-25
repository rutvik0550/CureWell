
using CureWellDataAccessLayer;
using CureWellDataAccessLayer.Models;

namespace CureWellServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<CureWellDbContext>();
            builder.Services.AddTransient<CureWellRepository>(
                c => new CureWellRepository(c.GetRequiredService<CureWellDbContext>()));
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

            // ✅ Enable Swagger for both Development and Production
            if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
