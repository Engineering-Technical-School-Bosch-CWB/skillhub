namespace Api.Core.Helpers;

public static class ConfigHelper
{
    private static string _environment = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT") ?? "Development";
    public static IConfigurationRoot GetConfig()
    {
        string path = _environment == "Development" ? "appsettings.Development.json" : "appsettings.json";
        if(path == "Development") 
        {
            Console.BackgroundColor = ConsoleColor.Red;
            System.Console.WriteLine("The system is missing an the environment variable: 'DOTNET_ENVIRONMENT'");
        }
        var config =  new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(path, optional: false, reloadOnChange: true)
            .Build();
        return config;
    }
    public static string? GetBaseUrl()
        => GetConfig()["App:Domain"];
}