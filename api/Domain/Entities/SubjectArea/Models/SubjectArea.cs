using System.Text.Json;
using System.Text.Json.Serialization;

using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SubjectArea : IEntity
{
  public required string Name { get; set; }
  public bool IsActive { get; set; } = true;
  
  [JsonIgnore]
  public ICollection<CurricularUnit> CurricularUnits { get; set; } = [];
}
