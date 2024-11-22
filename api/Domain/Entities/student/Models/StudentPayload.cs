namespace Api.Domain.Models
{
    public readonly record struct StudentCreatePayload(
        int UserId,
        int ClassId
    );
}