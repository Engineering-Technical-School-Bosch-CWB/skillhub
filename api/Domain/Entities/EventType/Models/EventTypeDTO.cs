
namespace Api.Domain.Models;

public record EventTypeDTO(
    int Id,
    string Name,
    bool AllDay,
    bool Saturday,
    bool DisableDay,
    bool AllClasses,
    string Icon,
    string Color
){
        public static EventTypeDTO Map(EventType obj)
    {
        return new EventTypeDTO(
            obj.Id,
            obj.Name,
            obj.AllDay,
            obj.Saturday,
            obj.DisableDay,
            obj.AllClasses,
            obj.Icon,
            obj.Color
        );
    }
}
