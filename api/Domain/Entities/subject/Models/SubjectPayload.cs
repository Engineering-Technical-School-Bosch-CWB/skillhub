namespace Api.Domain.Models
{
    public readonly record struct SubjectCreatePayload(
        int InstructorId,
        int CurricularUnitId,
        int ClassId,
        int Period,
        float DurationHours,
        DateTime BeganAt
    );
}