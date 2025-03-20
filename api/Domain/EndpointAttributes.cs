namespace Api.Domain.Attributes;

/// <summary>
/// An attribute to ignore JWT authentication in request 
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class IgnoreAuthenticationAttribute : Attribute;


/// <summary>
/// An attribute to permit student access endpoint
/// </summary>
[AttributeUsage(AttributeTargets.Method)]
public class StudentCanBeAccessAttribute : Attribute;