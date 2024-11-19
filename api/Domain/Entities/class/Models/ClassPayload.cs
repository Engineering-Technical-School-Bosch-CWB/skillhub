namespace Api.Domain.Models
{
    public readonly record struct ClassCreatePayload(
        int CourseId,
        short StartingYear,
        short DurationPeriods
    );
}