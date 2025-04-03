namespace Api.Domain.Models;

public record EventMemberDTO(
    int Id,
    string Name,
    bool Responsible
){
    public static EventMemberDTO Map(EventMember obj){
        return new EventMemberDTO(
            obj.Id,
            obj.Member.Name,
            obj.Is_responsible
        );
    }
}


