namespace Api.Core.Helpers;

public static class ConfigHelper
{

    public static IConfigurationRoot GetConfig()
    {
        var config =  new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
        return config;
    }
    public static string? GetBaseUrl()
        => GetConfig()["App:Domain"];
}