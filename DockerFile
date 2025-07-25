# ----- Build stage -----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the .csproj first
COPY CureWellApp/*.csproj ./CureWellApp/
COPY CureWellDataAccessLayer/*.csproj ./CureWellDataAccessLayer/

# restore using the web app project instead of solution
RUN dotnet restore CureWellApp/CureWellApp.csproj

# copy the rest
COPY . .

WORKDIR /src/CureWellApp
RUN dotnet publish -c Release -o /app/publish

# ----- Runtime stage -----
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "CureWellApp.dll"]
