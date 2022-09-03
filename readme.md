# CMS

This project was created during a school project work

## Verzeichnisstruktur

/cms/: Basisverzeichnis

/cms/cms-customer/: Nutzeransicht (Projektverzeichnis)

/cms/cms-admin/cms-backend/: Backend (Projektverzeichnis)

/cms/cms-admin/cms-frontend/: Frontend (Projektverzeichnis)

/cms/mysql/: MySQL (Docker)

## Lokales testen des Frontends:

Zum lokalen testen des Frontends sollten die npm-Pakete installiert werden:

```
npm install
```

Starten des Projekts:

```
npm run start:local
```
(Vermutlich nicht möglich, da Datenbank und Backend nicht eingerichtet. Starten über Docker wird empfohlen.)

## Inbetriebnahme

Die Inbetriebnahme ist über Docker angedacht.

Hierfür muss zunächst der Docker-Service gestartet werden. Dies kann je nach Betriebssystem unterschiedlich sein.

Unter Windows wird hierfür lediglich die Anwendung "Docker Desktop gestartet".

Anschließend wird im Basisverzeichnis des CMS der Befehl "docker-compose up" mit Administratorrechten ausgeführt (getestet unter Windows 10).

Nach kurzer Wartezeit ist das Front- / Backend (siehe Projektdokumentation) unter http://localhost:4001 und die
Nutzeransicht (siehe Projektdokumentation) unter http://localhost:4002 erreichbar.

