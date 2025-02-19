namespace Api.Domain.Services;
public interface IPermissionService
{
    public void ValidatePermission();
    public bool IsLogged(int id);
}