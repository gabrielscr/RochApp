namespace Server.Features.Product

{
    using Server.Infra;
    using MediatR;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Tempus.Utils;
    using System.Threading;

    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class CommandHandler : AsyncRequestHandler<Command>
        {
            readonly AdminContext _adminContext;

            public CommandHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _adminContext
                    .Set<Domain.Admin.Product>()
                    .FirstOrDefaultAsync(p => p.Id == request.Id);

                ChecarSe.Encontrou(product);

                _adminContext.Remove(product);

                await _adminContext.SaveChangesAsync();
            }
        }
    }
}