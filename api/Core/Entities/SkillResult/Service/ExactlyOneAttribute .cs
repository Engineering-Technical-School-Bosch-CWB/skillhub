using System.ComponentModel.DataAnnotations;

namespace Api.Core.Services;

public class ExactlyOneAttribute(params string[] propertyNames) : ValidationAttribute
{
    private readonly string[] _propertyNames = propertyNames;

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var type = validationContext.ObjectType;
        var values = _propertyNames
            .Select(propertyName => type.GetProperty(propertyName)?.GetValue(validationContext.ObjectInstance))
            .Where(v => v != null)
            .ToList();

        if (values.Count == 1)
        {
            return ValidationResult.Success;
        }

        var errorMessage = ErrorMessage ?? $"Exactly one of the following properties must have a value: {string.Join(", ", _propertyNames)}";
        return new ValidationResult(errorMessage);
    }
}
