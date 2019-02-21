namespace CodeGeneration
{
    using CodeGeneration.Ts;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    public class Program
    {
        private static IEnumerable<GeneratorMetadata> _commands = new[]
        {
            new GeneratorMetadata(args => new TsGenerator().GenerateCode(CreateServerContext(args)), "ts", "dotnet run ts"),
        };

        public static void Main(string[] args)
        {
            var commandName = args.FirstOrDefault();

            var command = _commands.FirstOrDefault(c => c.Command == commandName);

            if (command != null)
            {
                command.Generator(args);
            }
            else
            {
                Console.WriteLine($"Comando não reconhecido: {commandName}");
                Console.WriteLine();
                Console.WriteLine("Comandos disponíveis:");

                foreach (var c in _commands)
                {
                    Console.WriteLine("    " + c.Description);
                }
            }
        }

        class GeneratorMetadata
        {
            public GeneratorMetadata()
            {

            }

            public GeneratorMetadata(Action<string[]> generator, string command, string description)
            {
                Generator = generator;
                Command = command;
                Description = description;
            }

            public Action<string[]> Generator { get; set; }

            public string Command { get; set; }

            public string Description { get; set; }
        }

        private static CodeGeneratorContext CreateServerContext(string[] args)
        {
            var root = Directory.GetParent(Directory.GetCurrentDirectory()).ToString();

            return new CodeGeneratorContext
            {
                Arguments = args.Skip(1).ToArray(),
                RootPath = root,
                ClientPath = Path.Combine(root, @"RochApp\src\"),
                Controllers = typeof(Server.Startup).Assembly.GetTypes().Where(t => t.Name.EndsWith("Controller"))
            };
        }
    }
}
