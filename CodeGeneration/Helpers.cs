using System;
using System.Collections.Generic;

namespace CodeGeneration
{
    public static class Helpers
    {
        public static bool IsNullableType(this Type source)
        {
            return (source.IsGenericType && source.GetGenericTypeDefinition().Equals(typeof(Nullable<>)));
        }

        public static bool IsEnumerable(this Type source)
        {
            return source.GetEnumerableElementType() != null;
        }

        public static Type GetEnumerableElementType(this Type type)
        {
            if (typeof(Array).IsAssignableFrom(type))
                return type.GetElementType();

            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                return type.GetGenericArguments()[0];

            foreach (var interfaceType in type.GetInterfaces())
            {
                if (interfaceType.IsGenericType
                    && interfaceType.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                {
                    return interfaceType.GenericTypeArguments[0];
                }
                else
                {
                    var t = interfaceType.GetEnumerableElementType();
                    if (t != null)
                        return t;
                }
            }

            return null;
        }
    }
}
