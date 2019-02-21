namespace CodeGeneration.Ts
{
    using System;
    using System.IO;

    /// <summary>
    /// Gera as definições Typescript dos Dtos e Enums da API do servidor
    /// </summary>
    public class TsGenerator: ICodeGenerator
    {
        readonly DtoFinder _dtoFinder;
        readonly TsTypeMapper _tsMapper;
        readonly TsTemplate _tsTemplate;

        public TsGenerator()
        {
            _dtoFinder = new DtoFinder();
            _tsMapper = new TsTypeMapper();
            _tsTemplate = new TsTemplate();
        }

        public void GenerateCode(CodeGeneratorContext context)
        {
            Console.WriteLine("Generating Typescript definitions...");

            var dtoTypes = _dtoFinder.FindFromControllers(context.Controllers, new[] { Constants.BaseNamespace });
            var tsTypes = _tsMapper.Map(dtoTypes);
            var code = _tsTemplate.Render(tsTypes);

            var outputPath = Path.Combine(context.ClientPath, "api.typings.ts");

            File.WriteAllText(outputPath, code);

            Console.WriteLine();
            Console.WriteLine("Generated Typescript definition for DTOs: " + outputPath.Substring(context.RootPath.Length));
        }
    }
}
