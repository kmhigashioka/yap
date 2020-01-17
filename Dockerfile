FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY . .

WORKDIR /app/src/WebUI/ClientApp
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y build-essential nodejs
RUN npm install
RUN npm run build

WORKDIR /app/src/WebUI
RUN dotnet restore
RUN dotnet publish -c Release -o out

WORKDIR /app/src/WebUI
RUN cp -R ./ClientApp/build ./out/ClientApp/

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
EXPOSE 80
COPY --from=build-env /app/src/WebUI/out .
ENTRYPOINT ["dotnet", "WebUI.dll"]
