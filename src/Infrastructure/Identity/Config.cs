using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace Infrastructure.Identity
{
    public class Config
    {
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "mvc",
                    ClientSecrets =
                    {
                        new Secret("mvc".Sha256())
                    },
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    RequireConsent = false,
                    RequireClientSecret = false,

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1"
                    },
                    AllowOfflineAccess = true
                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource
                {
                    Name = "Photo",
                    UserClaims = new List<string> {"photo"}
                }
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource
                {
                    Name = "customAPI",
                    DisplayName = "Custom API",
                    Description = "Custom API Access",
                    UserClaims = new List<string> {"photo"},
                    ApiSecrets = new List<Secret> {new Secret ("scope.Secret".Sha256()) },
                    Scopes = new List<Scope>
                    {
                        new Scope("customAPI.read"),
                        new Scope("customAPI.write")
                    }
                },
                new ApiResource("api1")
            };
        }
    }
}
