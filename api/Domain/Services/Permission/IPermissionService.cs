namespace Api.Domain.Services;
public interface IPermissionService
{
    public void ValidateAdmPermission();
    public bool IsLogged(int id);
}