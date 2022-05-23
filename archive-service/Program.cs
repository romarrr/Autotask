using ArchiveService.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Conventions;
using ArchiveService.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConventionRegistry.Register("Camel Case", new ConventionPack { new CamelCaseElementNameConvention() }, _ => true);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetConnectionString("MongoDb")));
builder.Services.AddScoped(s => new AppDbContext(s.GetRequiredService<IMongoClient>(), builder.Configuration["DbName"]));
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("archive"));
builder.Services.AddScoped<IArchiveRepo, ArchiveRepo>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpClient<ArchiveController>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ArchiveService v1");
    });
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors("ApiCorsPolicy"); 

app.MapControllers();

app.Run();

