using CureWellDataAccessLayer;
using CureWellDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace CureWellServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ✅ Use SQLite (connection string in appsettings.json)
            builder.Services.AddDbContext<CureWellDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("CureWellDBConnectionString")));

            // ✅ Repository registration
            builder.Services.AddScoped<CureWellRepository>();

            // ✅ Add controllers and Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // ✅ Allow any CORS (adjust for security as needed)
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // ✅ Enable Swagger for dev and prod
            if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            // ✅ Ensure database is created and seed from CureWell.sql
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<CureWellDbContext>();
                // Create empty database if not exists
                db.Database.EnsureCreated();

                // Path to your SQL script (make sure CureWell.sql is copied to output)
                var scriptPath = Path.Combine(AppContext.BaseDirectory, "CureWell.sql");
                if (File.Exists(scriptPath))
                {
                    var sql = File.ReadAllText(scriptPath);
                    if (!string.IsNullOrWhiteSpace(sql))
                    {
                        db.Database.ExecuteSqlRaw(sql);
                    }
                }
            }

            app.Run();
        }
    }
}
