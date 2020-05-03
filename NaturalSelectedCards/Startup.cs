using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
        }
 
        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();
            
            //app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseMvc();
        }
    }
}