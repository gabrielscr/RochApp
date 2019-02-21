namespace Server.Features.Produto
{
    using Domain.Admin;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Server.Infra;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public class List
    {
        public class Query : IRequest<Dto>
        {

        }

        public class Dto
        {
            public ProductDto[] Products { get; set; }
        }

        public class ProductDto
        {
            public int Id { get; set; }

            public string Descricao { get; set; }

            public double Valor { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, Dto>
        {
            readonly AdminContext _adminContext;

            public QueryHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            public async Task<Dto> Handle(Query request, CancellationToken cancellationToken)
            {
                var data = await _adminContext
                    .Set<Produto>()
                    .AsNoTracking()
                    .Select(a => new ProductDto
                    {
                        Id = a.Id,
                        Descricao = a.Descricao,
                        Valor = a.Valor
                    })
                    .OrderBy(a => a.Descricao)
                    .ToArrayAsync();

                return new Dto
                {
                    Products = data
                };
            }
        }
    }
}
