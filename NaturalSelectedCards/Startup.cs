using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace NaturalSelectedCards
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddMvc(o => o.EnableEndpointRouting = false);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NSCards Api", Version = "v1" });
            });
        }
 
        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            
            //app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseSwaggerUI(c =>
            {
                // Заходить по {ip}:{port}/swagger
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "NSCards Api");
            });

            app.UseRouting();
            app.UseMvc();
        }
    }
}