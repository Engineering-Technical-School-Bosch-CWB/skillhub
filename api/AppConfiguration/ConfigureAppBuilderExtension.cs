using Microsoft.EntityFrameworkCore;

using Api.Core;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static ConfigureWebHostBuilder ConfigureDomain(this ConfigureWebHostBuilder builder, ConfigurationManager configuration)
    {
        int port = Int32.Parse(configuration.GetSection("App")["port"] ?? "0");
        var ip = System.Net.IPAddress.Parse(configuration.GetSection("App")["url"]);
        builder.UseKestrel(options => {
            options.Listen(ip, port);
        });

        return builder;
    }
}