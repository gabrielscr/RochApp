namespace Server.Features.Product
{
    using MediatR;
    using System.Threading.Tasks;
    using Server.Infra;
    using System.Threading;
    using Microsoft.EntityFrameworkCore;

    public class GetNextId
    {
        public class Query : IRequest<int>
        {
        }


        public class QueryHandler : IRequestHandler<Query, int>
        {
            readonly AdminContext _adminContext;

            public QueryHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                var hasItens = await _adminContext
                    .Set<Domain.Admin.Product>()
                    .AnyAsync();

                if (!hasItens)
                    return 1;

                return await _adminContext
                    .Set<Domain.Admin.Product>()
                    .AsNoTracking()
                    .MaxAsync(p => p.Id) + 1;
            }
        }
    }
}
