# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj files first
COPY CureWellServices/*.csproj ./CureWellServices/
COPY CureWellDataAccessLayer/*.csproj ./CureWellDataAccessLayer/
COPY CureWell.sln .

# restore the actual web project
RUN dotnet restore CureWellServices/CureWellServices.csproj

# now copy everything
COPY . .

# publish the web project
WORKDIR /src/CureWellServices
RUN dotnet publish -c Release -o /app

# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app ./

# start the web service
ENTRYPOINT ["dotnet", "CureWellServices.dll"]
