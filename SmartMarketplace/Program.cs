using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartMarketplace.Config;
using SmartMarketplace.Data;
using SmartMarketplace.Models;
using SmartMarketplace.Repository;
using SmartMarketplace.Repository.Interface;
using SmartMarketplace.Service;
using SmartMarketplace.Service.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(option =>
  option.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
  );

builder.Services.Configure<GroqOptions>(
  builder.Configuration.GetSection("Groq")
  );
builder.Services.AddHttpClient<IGroqService, GroqService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddScoped<IGroqService, GroqService>();


builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend",
    policy =>
    {
      policy.WithOrigins("http://localhost:5173") // replace this with your React app URL
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


builder.Services.AddIdentity<User, IdentityRole>()
  .AddEntityFrameworkStores<AppDbContext>()
  .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
  {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  })
  .AddJwtBearer(options =>
  {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,
      ValidIssuer = builder.Configuration["Jwt:Issuer"],
      ValidAudience = builder.Configuration["Jwt:Audience"],
      IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
  });



builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IJobService, JobService>();




var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
  var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  context.Database.Migrate(); // applies any pending migrations

  if (!context.Users.Any())
  {
    context.Users.AddRange(
      new User { FirstName = "admin", LastName = "admin2",Email = "admin@example.com" , Password = "12345679"},
      new User { FirstName = "aa", LastName = "zz",Email = "user1@example.com" , Password = "12345679"},
      new User { FirstName = "ee", LastName = "ee",Email = "user2@example.com" , Password = "12345679"}
    );
    context.SaveChanges();
  }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.MapControllers(); // ✅ Needed to map route attributes
app.Run();
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
