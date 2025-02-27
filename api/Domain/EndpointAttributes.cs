namespace Api.Domain.Attributes;

/// <summary>
/// An attribute to ignore JWT authentication in request 
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class IgnoreAuthenticationAttribute : Attribute;
