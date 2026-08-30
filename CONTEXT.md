# Sjøbein

Booking- og dugnadspoeng-app for familiens båt, Snekka. Målet er å gjøre Snekka lettere og triveligere å bruke — ikke å begrense bruken.

## Language

### Familie og eierskap

**Snekka**:
Familiens båt — navnet appen og familien bruker om den, aldri "båten" i UI-tekst. En snekke (halvt plast, halvt tre) man ikke sover ombord på.

**Familie-gren**:
En av de fire enhetene i brukerkretsen som eier bookinger og dugnadspoeng: MamPapp (foreldrene), Olav+Frida, Betina+Steinar, Benedicte+Stian. Poeng og bookinger tilhører grenen, ikke enkeltpersonen som utførte oppgaven eller booket — paret booker og opptjener sammen, ikke hver for seg.
_Avoid_: Person, bruker, husstand (husstand kan misforstås som "der man bor")

**Båtplass**:
Fortøyningsplassen Snekka ligger på i havnen/marinaen. Kilden til vaktplikten bak Dagvakt/Nattevakt — ikke å forveksle med selve Snekka.

### Booking

**Booking**:
En sammenhengende periode (i dager, ikke netter — man sover ikke ombord) én familie-gren har reservert Snekka for. Ingen grunnkvote — alle fire grener kan til enhver tid booke ledig tid fritt, uten godkjenning.
_Avoid_: Reservasjon, tur

**Standardgrense**:
De grensene som gjelder for en booking uten bruk av dugnadspoeng: maks 4 dager sammenhengende, og maks 6 ukers planleggingshorisont frem i tid. Justerbare innstillinger, ikke hardkodede regler — tenkt justert av foreldrene etter hvert som de ser hvordan appen faktisk brukes.
_Avoid_: Kvote, grunnkvote (antyder feilaktig at det finnes en begrensning på *hvor mye* man totalt får booke — det finnes ikke)

**Utvidet lengde**:
En booking utover Standardgrensens 4 dager. Koster 5 dugnadspoeng per ekstra dag (justerbart).

**Fri horisont**:
En booking som ikke er bundet av Standardgrensens 6-ukers planleggingshorisont. Låses opp for en gitt booking mot en lav, fast kostnad på 5 dugnadspoeng (ikke gradert per uke, justerbart) — uavhengig av om samme booking også bruker poeng på Utvidet lengde.

### Dugnad og poeng

**Dugnadspoeng**:
Valuta en familie-gren opptjener ved å utføre dugnadsoppgaver på Snekka. Brukes ikke til å "få lov" til å booke i det hele tatt (booking er alltid fri), men til Utvidet lengde og/eller Fri horisont på en gitt booking.
_Avoid_: Poeng (for upresist alene — bruk alltid "dugnadspoeng" for å skille fra andre tellinger)

**Dugnadsoppgave**:
En konkret, poenggivende arbeidsøkt på Snekka. Fast katalog med faste poengverdier (justerbare), pluss én åpen kategori "Annet" honorert per time. Ingen godkjenning kreves for noen av dem — selvrapportering, synlig for alle familie-grener i en felles logg som gir lett sosial synlighet fremfor formell godkjenning.
_Avoid_: Oppgave (alene, for upresist)

Katalog og utgangstall (alle justerbare):
- Vårklargjøring — 15 poeng
- Opptak — 15 poeng
- Vask — 5 poeng
- Pusse og lakke — 10 poeng
- Dagvakt — 10 poeng (8t vakt, 1,25 poeng/time)
- Nattevakt — 18 poeng (12t vakt, 1,5 poeng/time)
- Annet — 1 poeng per time

**Sesongstipend**:
30 dugnadspoeng MamPapp automatisk krediteres ved sesongstart, som anerkjennelse for at de dekker faste kostnader (reparasjon, båt, båtplass) selv om de sjelden booker selv. Bevisst valgt fremfor et unntak fra Standardgrense — holder booking- og poengreglene identiske for alle fire familie-grener, med bidraget anerkjent i samme valuta som dugnad.
_Avoid_: Bonus, unntak

**Dagvakt / Nattevakt**:
Vaktøkt ved båtplassen, pålagt av havnen/marinaen som en felles dugnadsordning — omtrent 2 vakter per båtplass per år, slik at det alltid er noen til stede ved kaien gjennom sesongen. Utføres av én person, men gir dugnadspoeng til vedkommendes familie-gren. Vektet bevisst over 1 poeng/time (se katalogen), siden vakt er lav innsats men lett å fordele jevnt mellom grenene — en lavterskel vei til dugnadspoeng for grener som sjelden er ved Snekka ellers.
_Avoid_: Vakt (alene, skill mellom dag og natt siden de har ulik poengverdi)

### Info og fellesskap

**Oppgaveliste**:
Åpen liste over ting som bør gjøres på Snekka (f.eks. "fenderen på babord er ødelagt"), som hvem som helst kan legge inn. Når noen gjør en oppgave fra lista, logges den som Annet-dugnad og krysses ut — kobler dermed info-delen direkte til dugnadspoeng.
_Avoid_: Vedlikeholdsliste, TODO

**Loggbok**:
Én løpende, felles tekstlogg der familie-grener legger igjen beskjeder til den som bruker Snekka neste gang (f.eks. "tanken er full", "propellen hørtes rar ut"). Ikke knyttet til enkeltbookinger — én delt strøm alle leser og skriver i.
_Avoid_: Beskjed (alene), meldinger

**Referanseinfo**:
Praktisk oppslagsinnhold man trykker seg inn på ved behov — plassnummer, motorinfo, sikkerhet, husregler. Ikke en obligatorisk sjekkliste.
_Avoid_: Instruksjoner (alene, for upresist om hvorvidt det er obligatorisk)

**Tilbakemelding**:
Fritekst familie-grener kan sende til Olav (utvikleren) om appen — ønsker, feil, ideer. Ren énveis postkasse, ingen kategori, ingen status synlig for familien.
_Avoid_: Feedback (bruk norsk term i UI), issue (det er det internt, ikke det familien kaller det)

**Nyheter**:
Enkel endringslogg i appen (patch notes) som viser familien hva som er endret/lagt til nylig — den lette måten å lukke sløyfen på tilbakemeldinger uten et fullt status-system.
_Avoid_: Changelog, patch notes (bruk norsk term i UI)

**Innstillinger**:
Siden hvor Standardgrense, Poengverdi-tallene, prisen på Utvidet lengde og Fri horisont justeres. Beskyttet av en enkel PIN (ikke koblet til familie-gren-identiteten fra Q2) — resten av appen er helt tillitsbasert uten sperrer, men innstillinger har bevisst en liten hindring siden feiljustering påvirker alle grener. Endringer vises i Nyheter, så det er uansett synlig for alle at noe er justert.
