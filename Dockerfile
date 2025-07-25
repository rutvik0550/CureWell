FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj and sln
COPY CureWell.sln ./
COPY CureWellApp/*.csproj ./CureWellApp/
COPY CureWellDataAccessLayer/*.csproj ./CureWellDataAccessLayer/
COPY CureWellServices/*.csproj ./CureWellServices/

# restore via solution
RUN dotnet restore CureWell.sln

# copy the rest
COPY . .

# publish
WORKDIR /src/CureWellApp
RUN dotnet publish -c Release -o /app/publish

# runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "CureWellApp.dll"]
