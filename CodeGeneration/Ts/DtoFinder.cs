using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CodeGeneration.Ts
{
    public class DtoFinder
    {
        public IEnumerable<Type> FindFromControllers(IEnumerable<Type> controllers, IEnumerable<string> validNamespaces)
        {
            var actions = controllers.SelectMany(FindActions);
            var actionsTypes = FindActionsTypes(actions);

            return Find(actionsTypes, validNamespaces).Except(controllers);
        }

        private IEnumerable<Type> FindActionsTypes(IEnumerable<MethodInfo> actions)
        {
            var actionsReturnTypes = actions.Select(a => a.ReturnType);
            var actionsParamsTypes = actions.SelectMany(a => a.GetParameters().Select(p => p.ParameterType));

            return actionsReturnTypes.Concat(actionsParamsTypes).Distinct();
        }
        
        private readonly string[] NonActionMethods = new[] { "Equals", "GetType", "Dispose", "ToString", "GetHashCode" };

        private IEnumerable<MethodInfo> FindActions(Type controllerType)
        {
            return controllerType
                .GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.InvokeMethod)
                .Where(m =>
                    !m.IsSpecialName
                    && m.GetCustomAttribute<NonActionAttribute>() == null
                    && !NonActionMethods.Contains(m.Name));

        }

        public IEnumerable<Type> Find(IEnumerable<Type> types, IEnumerable<string> validNamespaces)
        {
            var result = new HashSet<Type>();

            FindDtoTypes(result, validNamespaces, types.ToArray());

            return result;
        }

        private IEnumerable<MethodInfo> GetMethods(Type type)
        {
            return type
                .GetMethods(BindingFlags.Public | BindingFlags.Instance)
                .Where(m => !m.IsSpecialName);
        }

        private IEnumerable<Type> GetMethodTypes(MethodInfo methodInfo)
        {
            return methodInfo
                .GetParameters()
                .Select(p => p.ParameterType)
                .Append(methodInfo.ReturnType);
        }

        private IEnumerable<PropertyInfo> GetProperties(Type type)
        {
            return type.GetProperties(BindingFlags.Public | BindingFlags.Instance);
        }

        private Type GetPropertyType(PropertyInfo propertyInfo)
        {
            return propertyInfo.PropertyType;
        }

        private void FindDtoTypes(HashSet<Type> result, IEnumerable<string> validNamespaces, params Type[] types)
        {
            foreach (var type in types)
            {
                if (type.IsNullableType())
                {
                    var underlyingType = type.GenericTypeArguments.First();
                    FindDtoTypes(result, validNamespaces, underlyingType);
                }
                else if (type.IsEnumerable() && type != typeof(string))
                {
                    var underlyingType = type.GetEnumerableElementType();
                    FindDtoTypes(result, validNamespaces, underlyingType);
                }
                else if (type.IsClass && validNamespaces.Any(n => type.Namespace.StartsWith(n)) && result.Add(type))
                {
                    var propertiesTypes = GetProperties(type).Select(GetPropertyType);

                    var methodsTypes = GetMethods(type).SelectMany(GetMethodTypes);

                    var interfacesTypes = type
                        .GetInterfaces()
                        .Where(i => i.IsGenericType)
                        .SelectMany(i => i.GetGenericArguments());

                    var subTypes = propertiesTypes
                        .Concat(methodsTypes)
                        .Concat(interfacesTypes);

                    if (type.BaseType != null)
                        subTypes = subTypes.Append(type.BaseType);

                    if (type.IsGenericType)
                        subTypes = subTypes.Concat(type.GetGenericArguments());

                    FindDtoTypes(result, validNamespaces, subTypes.ToArray());
                }
                else if (type.IsEnum && validNamespaces.Any(n => type.Namespace.StartsWith(n)))
                {
                    result.Add(type);
                }
            }
        }
    }
}
