# Requirements

This document contains the list of requirements from the given task at blackboard and how we have solved them. (Downloaded 8.11.2023 kl 20:30)
This document is written in norwegian for easier reading.

## Funksjonalitet

Løsningen skal være en prototyp på en søkbar katalog med frontend hvor brukeren skal kunne formulere et søk og få presentert et søkeresultat, som bruker i etterkant kan ha interaksjon med. Funksjonalitet som skal støttes:

- Søkemulighet eks. med en dialog/form/søkefelt for input av søk

Vi har implementert et tekstfelt hvor bruker har mulighet til å søke i fritekst på filmtitler i databasen. Underveis som brukeren skriver inn søket sitt vil en listevisning vise titlene som tilfredsstiller kravene.

- Listebasert presentasjon av søk hvor det er lagt opp til håndtering av store resultatsett med enten blaing i sider, eller dynamisk laster av flere resultater ved scrolling

Søket lister opp til 20 titler av gangen. Dersom det er ønskelig å få frem flere titler er det mulig å velge knappen som laster inn de neste 20 titlene også.

- Muligheten for å se mer detaljer om hvert av objekten

Listevisningen gjør det mulig for brukeren å velge en bestemt film, for å deretter få mer detaljert informasjon om denne filmen.

- Mulighet for sortering og filtrering av resultatsettet (merk at sortering og filtrering skal utføres på hele resultatsettet og ikke bare det som tilfeldigvis er laster inn på klienten)

Øverst på siden som viser frem listevisningen av filmer er det mulig å velge hvilken kategori man ønsker å se resultater fra (filtrering). Det er også mulig å enten sortere på gjennomsnittlig rating eller alfabetisk rekkefølge. Det er ikke mulig å sortere på begge disse samtidig, da det ikke gir mening. Dersom bruker har valgt en bestemt kategori vil sorteringen kun gjelde på de filmene som tilhører den kategorien. Filtreringen og sorteringen fungerer på hele datasettet. Dette er gjort ved hjelp av å sende en tallverdi til serveren, som deretter henter ut antall filmer egnet til den siden fra databasen. Det blir derfor bare hentet de filmene som er nødvendig, både fra server til klient, men også mellom database og server.

- Det skal inngå en eller annen form for brukergenererte data som skal lagres (persistent på databaseserveren) og presenteres (enten bruker som legger til informasjon, reviews, ratings etc, historikk om søkene eller annet, handleliste).

Brukeren har mulighet til å legge til ratings på filmer, og også mulighet til å legge en bestemt film i sin egne "watchlist". Ratingen til filmen er per nå kun koblet opp til bruker og lagrede rangeringer vil vises når brukeren går inn i detaljert visning på en bestemt film. Filmene som ligger i "watchlist" vises i en egen sidevisning på siden. Her hentes filmene som ligger i "watchlist" med støtte for pagination.

- Løsningen skal demonstrere aspekter ved universell utforming / web accessibility (tilgjengelighet).

Vi har hatt fokus på å holde designet enkelt med klare kontraster mellom bakgrunn og tekst. Dette er et viktig tiltak for å sikre lesbarheten av tekst på siden. Når bruker har scrollet lengre ned på siden vil en knapp komme til syne nederst i høyre hjørne på siden. Denne knappen skal gjøre det enkelt for alle brukere av siden å rask scrolle til toppen. Denne er ikke tatt med på smalere skjermer, da dette er noe vi opplever som integrert i operativsystemene på mange nettbrett og mobile enheter.

- Løsningen skal demonstrere aspekter ved bærekraftig webutvikling (gjennom valg som gjøres i design)
  Caching, debounce på søk per nå.

- God design, fornuftige valg og løsninger som harmonerer med typen data dere velger

- Database og backend for prosjektet skal ved innlevering hostes på gruppas virtuelle maskin.
  Database, backend og frontend er hostet på vår virtuelle maskin. Siden kan nås gjennom: [http://it2810-16.idi.ntnu.no/project2/](http://it2810-16.idi.ntnu.no/project2/)

## Bruk av teknologi

- Brukergrensesnitt skal være basert på React og programmert i Typeskript. Prosjektet skal settes opp med Vite

- Bruk av state managment eksempelvis redux, mobx, recoil, apollo local state management etc

Prosjektet benytter [Apollo Local State Management](https://www.apollographql.com/docs/react/local-state/local-state-management/). Gjennom `local resolvers` og `useQuery` lageres filtreringsverdier gjennom sesjonen. Dette gjør at bruker kan filtrere på kategori og sortere på rating/alfabetisk rekkefølge uten at dette blir nullstilt når bruker navigerer til en annen side.

- Egendefinert/utvikler GraphQL backend, fritt valg av type databaseserver på backend, men prosjektet skal benytte en backend-database som er satt opp av gruppa

Serveren er satt opp med nyeste versjon av [Apollo Server 4](https://www.apollographql.com/docs/apollo-server/). Den er skreddersydd for bruk med GraphQl.
Databasen er satt opp med en lokal versjon av [MongoDB](https://www.mongodb.com/). Dette er en NoSQL database som godt integrerer GraphQl.

- Bruk av gode og relevante komponenter og bibliotek (fritt valg og vi oppfordrer til mest mulig gjenbruk av tredjeparts løsninger)

Prosjektet benytter [Material UI](https://mui.com/) som komponentbibliotek.

## Testing, utvikling og kvalitetskontroll

- Linting og bruk av Prettier

Prosjektet er satt opp med strenge linting regler, som kjørers i alle typescript, javascript, og scss filer. Prettier har vært satt opp til å rette automatisk hos alle deltakere i prosjektet.

- Gjennomført testing av komponenter (vi bruker Vitest)

Vi har foreløpig 90+ tester i frontend, og 6 tester i backend. Disse skal forbedres og bli flere i løpet av prosjektet.

- En form for automatisert end-2-end testing (i praksis teste en lengre sekvens av interaksjoner), testing av API'et.

Skal implementeres i sprint 3.

- Prosjektet dokumenteres med en README.md i git repositoriet. Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).
- Koden skal være lettlest og godt strukturert og kommentert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.
- Gruppa skal oppsummere den enkeltes bidrag i prosjektet underveis i en egen fil som leveres i BB (dette er personopplysninger som ingen vil at skal ligge på git ;-)

### Back to [documentation](./README.md).
