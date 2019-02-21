using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Features.Produto
{
    public class ProdutoController : Controller
    {
        readonly IMediator _mediator;

        public ProdutoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ResponseCache(NoStore = true)]
        public async Task<ActionResult<List.Dto>> List(List.Query request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpPost]
        public async Task<ActionResult<int>> Insert([FromBody]InsertEdit.Command request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpGet]
        [ResponseCache(NoStore = true)]
        public async Task<ActionResult<InsertEdit.Command>> Edit(InsertEdit.Query request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpPut]
        public async Task<ActionResult<int>> Edit([FromBody]InsertEdit.Command request)
        {
            return Json(await _mediator.Send(request));
        }

        [HttpDelete]
        public async Task Delete([FromBody]Delete.Command request)
        {
            await _mediator.Send(request);
        }

        [HttpGet]
        [ResponseCache(NoStore = true)]
        public async Task<ActionResult<int>> GetNextId()
        {
            return Json(await _mediator.Send(new GetNextId.Query()));
        }
    }
}
