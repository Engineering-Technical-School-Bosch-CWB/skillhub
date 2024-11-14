using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class ObjectionRepository(Project_eContext context) 
    : BaseRepository<Objection>(context), IObjectionRepository
{

}
