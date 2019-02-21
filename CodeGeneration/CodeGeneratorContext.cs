namespace CodeGeneration
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;

    public class CodeGeneratorContext
    {
        public string RootPath { get; set; }

        public string ClientPath { get; set; }

        public string[] Arguments { get; set; }

        public IEnumerable<Type> Controllers { get; set; }
    }
}
