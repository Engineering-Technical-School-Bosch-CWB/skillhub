namespace Api.Core.Errors
{
    public class ServiceConfigurationException : Exception
    {
        public string FieldName { get; private set; }
        public Type ExpectedType { get; private set; }
        public Type Dependant { get; private set; }

        public ServiceConfigurationException(
                string fieldName,
                Type expectedType,
                Type dependant) : base($"Field {fieldName} on dependant {dependant} expected type {expectedType}.")
        {
            FieldName = fieldName;
            ExpectedType = expectedType;
            Dependant = dependant;
        }
    }
}