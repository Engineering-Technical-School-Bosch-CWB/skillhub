namespace api.Domain.Services.Login
{
    public readonly record struct LoginPayload(string Identification, string Password);    
}