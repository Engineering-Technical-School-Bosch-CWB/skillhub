
namespace Api.Domain.Models;

public record EventTypeDTO(
    int Id,
    string Name,
    bool AllDay,
    bool Saturday,
    bool Disable_day,
    bool All_classes,
    string Icon,
    string Color
){
        public static EventTypeDTO Map(EventType obj)
    {
        return new EventTypeDTO(
            obj.Id,
            obj.Name,
            obj.All_day,
            obj.Saturday,
            obj.Disable_day,
            obj.All_classes,
            obj.Icon,
            obj.Color
        );
    }
}
