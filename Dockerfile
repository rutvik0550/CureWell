# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only csproj first
COPY CureWellApp/*.csproj ./CureWellApp/
COPY CureWellDataAccessLayer/*.csproj ./CureWellDataAccessLayer/

# Restore using the web app project
RUN dotnet restore CureWellApp/CureWellApp.csproj

# Copy all files
COPY . .

# Publish
WORKDIR /src/CureWellApp
RUN dotnet publish -c Release -o /app/publish

# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "CureWellApp.dll"]
