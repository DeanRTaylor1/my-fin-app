using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication("cookie").AddCookie("cookie");
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("user", policy => policy.RequireClaim(ClaimTypes.Email));
});
builder.Services.AddControllersWithViews();

// Add CORS service

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
app.MapControllers();

//if route is not matched, serve the index.html file
app.MapFallbackToFile("index.html");
;

app.Run();
