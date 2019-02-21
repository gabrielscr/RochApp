using System;

namespace CodeGeneration.Ts
{
    /// <summary>
    /// Um tipo do Typescript
    /// </summary>
    public class TsType
    {
        /// <summary>
        /// Módulo/Namespace no typescript
        /// </summary>
        public string Module { get; set; }

        /// <summary>
        /// Nome do tipo no Typescript
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Nome completo incluindo o módulo
        /// </summary>
        public string FullName => string.IsNullOrEmpty(Module) ? Name : string.Concat(Module, ".", Name);
        
        /// <summary>
        /// Indica que é um enum não nativo
        /// </summary>
        public bool IsEnum { get; set; }

        /// <summary>
        /// Indica que é uma classe não nativa
        /// </summary>
        public bool IsClass { get; set; }

        /// <summary>
        /// Indica que é uma classe ou tipo de valor nativo do Typescript
        /// </summary>
        public bool IsNative => !IsEnum && !IsClass;

        /// <summary>
        /// Propriedades da classe ou enum
        /// </summary>
        public TsProperty[] Properties { get; set; }

        public Type ClrType { get; set; }
    }

    /// <summary>
    /// Propriedade de um tipo no Typescript
    /// </summary>
    public class TsProperty
    {
        public string Name { get; set; }

        public string DefaultValue { get; set; }

        public TsType TsType { get; set; }

        public bool IsNullable { get; set; }
        
        public bool IsArray { get; set; }
    }
}
