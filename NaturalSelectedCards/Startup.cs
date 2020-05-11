using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using NaturalSelectedCards.Data;
using NaturalSelectedCards.Data.Repositories;
using NaturalSelectedCards.Models.Settings;
using NaturalSelectedCards.Auth;
using NaturalSelectedCards.Utils.Constants;

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
            services.AddCors(options =>
            {
                options.AddPolicy(Policies.CorsPolicy, builder =>
                    builder
                        .WithOrigins(Urls.ReactDevServer)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                );
            });

            services.AddMemoryCache();

            services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));
            services.AddSingleton(sp =>
            {
                var settings = sp.GetRequiredService<DatabaseSettings>();
                var builder = new MongoDatabaseBuilder(settings);
                return builder.Build();
            });
            services.AddSingleton<IDeckRepository, MongoDeckRepository>();
            services.AddSingleton<ICardRepository, MongoCardRepository>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddMvc(o => o.EnableEndpointRouting = false);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "NSCards Api", Version = "v1"});

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services
                .AddAuthentication(options => options.DefaultScheme = AuthenticationSchemes.Google)
                .AddScheme<GoogleAuthenticationSchemeOptions, GoogleAuthenticationHandler>(
                    AuthenticationSchemes.Google, o => { });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(Policies.CorsPolicy);

            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                // Заходить по {ip}:{port}/swagger
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "NSCards Api");
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseMvc();

            app.UseAuthentication();
        }
    }
}