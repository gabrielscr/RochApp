using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Server.Infra;
using Tempus.Utils.AspNetCore;

namespace Server
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public IHostingEnvironment HostingEnvironment;

        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(opt =>
                {
                    opt.Filters.Add(typeof(JsonApiValidationActionFilter));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddFeatureFolders();

            services.AddDbContext<AdminContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ServerConnection"), opt => opt.EnableRetryOnFailure()));


            services.AddMediatR();

            RegisterValidators(services);
        }

        private void RegisterValidators(IServiceCollection services)
        {
            var assembly = typeof(Startup).GetTypeInfo().Assembly;
            var validatorType = typeof(IValidator);

            var validators = assembly
                .GetExportedTypes()
                .Where(t => validatorType.IsAssignableFrom(t) && !t.IsInterface);

            foreach (var validator in validators)
            {
                services.AddTransient(validator);

                var validatorInterfaces = validator
                    .GetInterfaces()
                    .Where(t => t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IValidator<>));

                foreach (var validatorInterface in validatorInterfaces)
                {
                    services.AddTransient(validatorInterface, validator);
                }
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env/*, IDbInitializer dbInitializer*/)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseCors("Development");
            }
            else
            {
                app.UseCors("Production");
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            if (env.IsProduction())
            {
                app.UseDefaultFiles();

                app.UseStaticFiles();
            }

            app.UseMvc(opts =>
            {
                opts.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action}/{id?}");
            });

            if (env.IsDevelopment())
            {
                app.UseWelcomePage();
            }
        }

    }
}
