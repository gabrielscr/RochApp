namespace Server.Features.Product
{
    using FluentValidation;
    using MediatR;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Domain.Admin;
    using Server.Infra;
    using System.Threading;
    using Microsoft.EntityFrameworkCore;
    using Tempus.Utils;

    public class InsertEdit
    {
        public class Query : IRequest<Command>
        {
            public int Id { get; set; }
        }

        public class Command : IRequest<int>
        {
            public int? Id { get; set; }

            public string Descricao { get; set; }

            public double Valor { get; set; }
        }

        public class Validation : AbstractValidator<Product>
        {
            readonly AdminContext _adminContext;

            public Validation(AdminContext adminContext)
            {
                _adminContext = adminContext;

                Build();
            }

            private void Build()
            {
                RuleFor(p => p.Descricao)
                    .MustAsync(UniqueName)
                    .WithMessage("Name already registered");
            }

            private async Task<bool> UniqueName(Product Product, string Descricao, CancellationToken cancellationToken)
            {
                return !await _adminContext
                    .Set<Product>()
                    .AsNoTracking()
                    .AnyAsync(p => p.Descricao == Product.Descricao && p.Id != Product.Id);
            }
        }

        public class QueryHandler : IRequestHandler<Query, Command>
        {
            readonly AdminContext _adminContext;

            public QueryHandler(AdminContext adminContext)
            {
                _adminContext = adminContext;
            }

            public async Task<Command> Handle(Query request, CancellationToken cancellationToken)
            {
                var command = await _adminContext
                    .Set<Product>()
                    .AsNoTracking()
                    .Select(a => new Command
                    {
                        Id = a.Id,
                        Descricao = a.Descricao,
                        Valor = a.Valor
                    })
                    .FirstOrDefaultAsync(p => p.Id == request.Id);

                ChecarSe.Encontrou(command);

                return command;
            }
        }

        public class CommandHandler : IRequestHandler<Command, int>
        {
            readonly AdminContext _adminContext;
            readonly Validation _validation;

            public CommandHandler(AdminContext adminContext, Validation validation)
            {
                _adminContext = adminContext;
                _validation = validation;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var model = await _adminContext
                    .Set<Product>()
                    .FindAsync(request.Id);

                if (model == null)
                {
                    model = new Product();

                    await _adminContext.AddAsync(model);
                }

                Map(request, model);

                await _validation.ValidateAndThrowAsync(model);

                await _adminContext.SaveChangesAsync();

                return model.Id;
            }

            private void Map(Command request, Product model)
            {
                model.Id = request.Id.Value;
                model.Descricao = request.Descricao;
                model.Valor = request.Valor;
            }
        }
    }
}
