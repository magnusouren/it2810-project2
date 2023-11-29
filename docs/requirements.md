# Requirements

This document contains the list of requirements from the given task at blackboard and how we have solved them. (Downloaded 8.11.2023 kl 20:30)
This document is written in norwegian for easier reading.

## Funksjonalitet

<i>Løsningen skal være en prototyp på en søkbar katalog med frontend hvor brukeren skal kunne formulere et søk og få presentert et søkeresultat, som bruker i etterkant kan ha interaksjon med. Funksjonalitet som skal støttes:</i>

#### Søkemulighet eks. med en dialog/form/søkefelt for input av søk

Vi har implementert et tekstfelt hvor bruker har mulighet til å søke i fritekst på filmtitler i databasen. Underveis som brukeren skriver inn søket sitt vil en listevisning vise titlene som tilfredsstiller kravene.

#### Listebasert presentasjon av søk hvor det er lagt opp til håndtering av store resultatsett med enten blaing i sider, eller dynamisk laster av flere resultater ved scrolling

Søkelinja lister opp til 20 titler av gangen. Dersom det er ønskelig å få frem flere titler er det mulig å velge knappen som laster inn de neste 20 titlene også.

Resultatet fra filtrering viser 16 titler av gangen. For resultater større enn 16 benyttes "pagination" og man kan bla mellom sidene.

#### Muligheten for å se mer detaljer om hvert av objekten

Listevisningen gjør det mulig for brukeren å velge en bestemt film, for å deretter få mer detaljert informasjon om denne filmen.

#### Mulighet for sortering og filtrering av resultatsettet (merk at sortering og filtrering skal utføres på hele resultatsettet og ikke bare det som tilfeldigvis er laster inn på klienten)

Øverst på siden som viser frem listevisningen av filmer er det mulig å velge hvilken kategori man ønsker å se resultater fra (filtrering). Det er også mulig å enten sortere på gjennomsnittlig rating eller alfabetisk rekkefølge. Det er ikke mulig å sortere på begge disse samtidig, da det ikke gir mening. Dersom bruker har valgt en bestemt kategori vil sorteringen kun gjelde på de filmene som tilhører den kategorien. Filtreringen og sorteringen fungerer på hele datasettet. Dette er gjort ved hjelp av å sende en tallverdi til serveren, som deretter henter ut antall filmer egnet til den siden fra databasen. Det blir derfor bare hentet de filmene som er nødvendig, både fra server til klient, men også mellom database og server.

#### Det skal inngå en eller annen form for brukergenererte data som skal lagres (persistent på databaseserveren) og presenteres (enten bruker som legger til informasjon, reviews, ratings etc, historikk om søkene eller annet, handleliste).

Brukeren har mulighet til å legge til ratings på filmer, og også mulighet til å legge en bestemt film i sin egne "watchlist". Ratingen til filmen er per nå kun koblet opp til bruker og lagrede rangeringer vil vises når brukeren går inn i detaljert visning på en bestemt film. Filmene som ligger i "watchlist" vises i en egen sidevisning på siden. Her hentes filmene som ligger i "watchlist" med støtte for pagination.

#### Løsningen skal demonstrere aspekter ved universell utforming / web accessibility (tilgjengelighet).

- Leselighet. Vi har hatt fokus på å holde designet enkelt med klare kontraster mellom bakgrunn og tekst. Dette er et viktig tiltak for å sikre lesbarheten av tekst på siden.

- Kontrast. Vi har sørget for at kontrasten mellom bakgrunn og tekst er godt leselig, men ikke for skarp. Dette har vi gjort for å unngå halation-effekt ved lesing over lengre tid. ref: [https://build.washingtonpost.com/resources/accessibility/color](https://build.washingtonpost.com/resources/accessibility/color)

- Scroll to top. Når bruker har scrollet lengre ned på siden vil en knapp komme til syne nederst i høyre hjørne på siden. Denne knappen skal gjøre det enkelt for alle brukere av siden å rask scrolle til toppen. Denne er ikke tatt med på smalere skjermer, da dette er noe vi opplever som integrert i operativsystemene på mange nettbrett og mobile enheter, ved å trykke på øverste del av skjermen.

- Støtte for tastatur-navigasjon. For å sikre at siden er tilgjengelig for alle brukere har vi også sørget for at alle elementer på siden er tilgjengelig med tastatur. Dette er gjort ved å benytte `tabindex` på alle elementer som er interaktive. Dette gjør at bruker kan navigere seg rundt på siden ved hjelp av tastaturet. Dette er en viktig funksjon for brukere som ikke har mulighet til å benytte mus. (I Safari (WebKit nettlesere) må man aktivere denne tastaturnavigasjon i innstillinger; Safari -> Settings -> Advanced -> Press Tab to highlight each item on a web page)

- Støtte for skjermlesere. Vi har lagt til `tabindex` på elementer vi ønsker skal bli fokusert og lest opp av skjermlesere. Dette er testet gjennom bruk av VoiceOver på MacOS og Google Chrome utvidelsen [Screen Reader](https://chromewebstore.google.com/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn). (Vi har utviklet med tanke på Chromium nettlesere, så denne funksjonen kan være ustabil i andre nettlesere.).

- Semantikk. Vi har benyttet mer presise semantiske html-elementer der det har vært mulig. Dette gjør at skjermlesere kan tolke innholdet på siden på en bedre måte.

#### Løsningen skal demonstrere aspekter ved bærekraftig webutvikling (gjennom valg som gjøres i design)

- Vi har benyttet Caching på alle våre API-kall for å minnimere antall kall til serveren. Dette gjør at bruker kan navigere mellom sider uten at det blir gjort nye kall til serveren. Dette gjelder også ved søk av samme søkeord.
- Ved søking benytter vi debouncing for å unngå at det blir gjort unødvendig mange kall til serveren. Dette gjør at det kun blir gjort et kall til serveren når bruker har stoppet å skrive i søkefeltet. Dette gjør at vi unngår at det blir gjort kall til serveren for hvert eneste tegn bruker skriver inn i søkefeltet.
- Bildekvaliteten på bildene er så langt det har latt seg gjøre optimalisert for å redusere filstørrelsen. Vi har her tatt behovet for å ha en viss kvalitet på bildene i betraktning. De mindre bildene som vises i listevisningen er optimalisert for å redusere filstørrelsen.
- I og med at vi benytter data fra et eksternt datasett er de ulike størrelsene som tilbys noe begrenset. Når det kommer til bildet som kommer frem i detaljert visning så vi oss nødt til å laste inn bildet i opprinnelig kvalitet. Det kommer av at API-et vi henter bilder fra ikke tilbyr noen begrensede bredder større enn 500px. I et optimalt produkt ville vi sørget for komprimerte bilder i denne visningen også.
- På siden er det støtte for både darkmode og lightmode. Vi har implementert darkmode for å spare energiforbuket til bruker. Dette er en funksjon som er tilgjengelig i de fleste moderne operativsystemer, og vi har derfor valgt å implementere dette i vårt produkt også.

- God design, fornuftige valg og løsninger som harmonerer med typen data dere velger.

#### God design, fornuftige valg og løsninger som harmonerer med typen data dere velger

Vi har valgt å bruke et enkelt design, med fokus på lesbarhet og brukervennlighet. Det er mye opphold, og forutsigbart layout. Dette er gjort for å gjøre det enkelt for bruker å finne frem til det de ønsker å se. Vi har også valgt å bruke en enkel fargepalett, med fokus på kontraster mellom bakgrunn og tekst. Dette er gjort for å sikre lesbarheten av tekst på siden.

#### Database og backend for prosjektet skal ved innlevering hostes på gruppas virtuelle maskin.

Database, backend og frontend er hostet på vår virtuelle maskin. Siden kan nås gjennom: [http://it2810-16.idi.ntnu.no/project2/](http://it2810-16.idi.ntnu.no/project2/)

<i>Man må være koblet på NTNU sitt internett eller være koblet til med VPN.</i>

Vi hoster to servere på vår virtuelle maskin. En for "produksjon" og en for "utvikling & testing".

- Production hostes på: it2810-16.idi.ntnu.no:4000
- Utvikling og testing hostes på: it2810-16.idi.ntnu.no:4001

Hver av serverene er koblet mot sin egen database. "Utvikling & test" bruker en testdatabase som er en begrenset kopi av produksjonsdatabasen "Bingewatcher".

## Bruk av teknologi

#### Brukergrensesnitt skal være basert på React og programmert i Typescript. Prosjektet skal settes opp med Vite

Dette kravet er fulgt fra start.

Vi har valgt å ikke skrive serveren i Typescript etter klarifikasjon fra foreleser at dette ikke var nødvendig. Serveren er liten og enkel, så å lage i Typescript ville gjort det mere avansert å kjøre under utvikling og bygge.

#### Bruk av state managment eksempelvis redux, mobx, recoil, apollo local state management etc

Prosjektet benytter [Apollo Local State Management](https://www.apollographql.com/docs/react/local-state/local-state-management/). Gjennom `local resolvers` og `useQuery` lageres filtreringsverdier gjennom sesjonen. Dette gjør at bruker kan filtrere på kategori og sortere på rating/alfabetisk rekkefølge uten at dette blir nullstilt når bruker navigerer til en annen side.

#### Egendefinert/utvikler GraphQL backend, fritt valg av type databaseserver på backend, men prosjektet skal benytte en backend-database som er satt opp av gruppa

Serveren er satt opp med nyeste versjon av [Apollo Server 4](https://www.apollographql.com/docs/apollo-server/). Den er skreddersydd for bruk med GraphQl.
Databasen er satt opp med en lokal versjon av [MongoDB](https://www.mongodb.com/). Dette er en NoSQL database som godt integrerer GraphQl.

#### Bruk av gode og relevante komponenter og bibliotek (fritt valg og vi oppfordrer til mest mulig gjenbruk av tredjeparts løsninger)

Bibliotekene som er benyttet er listet i klient og server sine "readme" filer.

- [Client](../client/README.md#third-party-libraries)
- [Server](../server/README.md#third-party-libraries)

## Testing, utvikling og kvalitetskontroll

#### Linting og bruk av Prettier

Prosjektet er satt opp med strenge linting regler, som kjøres i alle typescript, og scss filer. Prettier har vært satt opp til å rette automatisk hos alle bidragsyterne i prosjektet.

#### Gjennomført testing av komponenter (vi bruker Vitest)

Vi har foreløpig 67 unit tester i frontend, og 21 tester i backend.

#### En form for automatisert end-2-end testing (i praksis teste en lengre sekvens av interaksjoner), testing av API'et.

Vi benytter Playwright til end-2-end testing. Vi har 48 tester som tester generelle brukerinteraksjoner.

#### Prosjektet dokumenteres med en README.md i git repositoriet. Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).

Vi har flere dokumenasjonsfiler i prosjektet. [README.md](../README.md) i rot leder til de andre dokumentene.
Mesteparten av dokumentasjonen er skrevet i `docs` mappen.

#### Koden skal være lettlest og godt strukturert og kommentert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.

Vi har i stor grad fokusert på å skrive selvdokumenterende kode, i samsvar med at den skal være oversiktlig strukturert.

Vi har benyttet ESLint og Prettier fra start for å holde en jevn kodestruktur. Vi har skrevet javadoc til komponentene for å raskt kunne hente relevant informasjon med intellisens i IDE-er. Vi har kommentert inline i koden der vi har sett det nødvendig.

#### Gruppa skal oppsummere den enkeltes bidrag i prosjektet underveis i en egen fil som leveres i BB (dette er personopplysninger som ingen vil at skal ligge på git ;-)

### Back to [documentation](./README.md).
