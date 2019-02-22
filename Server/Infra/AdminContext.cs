namespace Server.Infra
{
    using Microsoft.EntityFrameworkCore;
    using Server.Domain.Admin;

    public class AdminContext : DbContext
    {

        public AdminContext(DbContextOptions<AdminContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>();
        }
    }
}
