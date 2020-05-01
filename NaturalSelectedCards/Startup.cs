using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMvc();

//            app.UseAuthentication();
//            app.UseAuthorization();
//            app.UseHttpsRedirection();
//            app.UseStaticFiles();
//            app.UseSpaStaticFiles();
//            app.UseRouting();
        }
    }
}