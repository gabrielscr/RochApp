using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using Tempus.Utils;

namespace CodeGeneration.Ts
{
    public class TsTypeMapper
    {
        public IEnumerable<TsType> Map(IEnumerable<Type> types)
        {
            var result = types.Select(Map).ToArray();

            foreach (var tsType in result.Where(r => r.IsClass))
            {
                FillProperties(tsType, result);
            }

            return result;
        }

        private TsType Map(Type type)
        {
            var mappers = new List<Func<Type, TsType>>()
            {
                MapString,
                MapNumber,
                MapBool,
                MapDate,
                MapEnum,
                MapClass,
                MapGuid
            };

            foreach (var mapper in mappers)
            {
                var result = mapper(type);

                if (result != null)
                    return result;
            }

            //throw new InvalidOperationException($"Invalid type for TSD file: {type.FullName}");
            return new TsType
            {
                Name = "any",
                ClrType = type
            };
        }

        private TsType MapGuid(Type type)
        {
            if (type == typeof(Guid))
                return new TsType
                {
                    Name = "string",
                    ClrType = type
                };

            return null;
        }

        private TsType MapString(Type type)
        {
            if (type == typeof(string))
                return new TsType
                {
                    Name = "string",
                    ClrType = type
                };

            return null;
        }

        private TsType MapNumber(Type type)
        {
            if (type == typeof(decimal) || type == typeof(double) || type == typeof(short) || type == typeof(int) || type == typeof(long))
                return new TsType
                {
                    Name = "number",
                    ClrType = type
                };

            return null;
        }

        private TsType MapBool(Type type)
        {
             if (type == typeof(bool))
                return new TsType
                {
                    Name = "boolean",
                    ClrType = type
                };

            return null;
        }

        private TsType MapDate(Type type)
        {
            if (type == typeof(DateTime) || type == typeof(DateTimeOffset))
                return new TsType
                {
                    Name = "string",
                    ClrType = type
                };

            return null;
        }

        private TsType MapEnum(Type type)
        {
            if (type.IsEnum)
            {
                var enumMetadata = GetFlags(type);

                var properties = enumMetadata
                    .Select(f => new TsProperty
                    {
                        Name = f.Name.ToTitleCase(),
                        DefaultValue = Convert.ToInt32(f.Value).ToString()
                    })
                    .ToArray();

                var names = GetNames(type);
                return new TsType
                {
                    Module = names.Module,
                    Name = names.Name,
                    IsEnum = true,
                    Properties = properties,
                    ClrType = type
                };
            }

            return null;
        }

        private IEnumerable<(Enum Value, string Name)> GetFlags(Type enumType)
        {
            var names = Enum.GetNames(enumType);
            foreach (var name in names)
            {
                var value = Enum.Parse(enumType, name) as Enum;

                yield return (value, name);
            }
        }

        private void FillProperties(TsType tsType, IEnumerable<TsType> tsTypes)
        {
            var properties = tsType.ClrType
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Select(p =>
            {
                var propertyType = p.PropertyType;
                var isNullable = false;
                var isArray = false;

                if (propertyType.IsNullableType())
                {
                    isNullable = true;
                    propertyType = propertyType.GenericTypeArguments.First();
                }

                if (propertyType.IsEnumerable() && propertyType != typeof(string))
                {
                    isArray = true;
                    propertyType = propertyType.GetEnumerableElementType();
                }

                if (propertyType == typeof(string) || isArray || propertyType == typeof(Guid))
                {
                    isNullable = p.GetCustomAttribute<RequiredAttribute>() == null;
                }

                return new TsProperty
                {
                    Name = StringUtils.ToCamelCase(p.Name),
                    IsNullable = isNullable,
                    IsArray = isArray,
                    TsType = tsTypes.FirstOrDefault(t => t.ClrType == propertyType) ?? Map(propertyType)
                };
            })
            .ToArray();

            tsType.Properties = properties;
        }

        private TsType MapClass(Type type)
        {
            if (type.IsClass)
            {
                var names = GetNames(type);
                return new TsType
                {
                    Module = names.Module,
                    Name = names.Name,
                    IsClass = true,
                    ClrType = type
                };
            }

            return null;
        }

        class TsNames
        {
            public string Module { get; set; }
            public string Name { get; set; }
        }

        private TsNames GetNames(Type type)
        {
            var fullName = type.FullName
                .Replace(".Backoffice.Features.", ".")
                .Replace(".Backoffice.Backoffice.", ".Backoffice.")
                .Replace(".Features.", ".")
                .Replace("+", ".") // Corrige nome para sub classes
                .Replace("Extensions.", "") // Gera interface para dto de Enum
                .Replace(Constants.BaseNamespace + ".", "")
                .Split('.');

            var module = string.Join(".", fullName.Take(fullName.Count() - 1));
            var name = fullName.Last();

            return new TsNames
            {
                Module = module,
                Name = name
            };
        }
    }
}
