const streetData = {
    title: "Straße",
    text: "Die Hauptstraße und die Fußgängerzone erschließen das Gebiet.",
    buttonText: "Schließen",
    citizenComments : {
        1 : {
            contributor: "Max Mustermann",
            comment: "Ich finde hier nie einen Parkplatz."
        },
        2 : {
            contributor: "Maria Musterfrau",
            comment: "Es fehlt eine Ampel oder ein Zebrastreifen um die Straße sicher zu überqueren."
        },
        3 : {
            contributor: "Diana Divers",
            comment: "Die Autos stehen hier ständig auf dem Radfahrstreifen."
        },
    },
    sensorData : {
        1: { titel: "Kfz Aufkommen letzten 24h",
             
            data: [
            { argument: "0", value: 100 },
            { argument: "1",value: 80},
            { argument: "2",value: 70 },
            { argument: "3",value: 80 },
            { argument: "4", value: 150 },
            { argument: "5", value: 340 },
            { argument: "6", value: 680 },
            { argument: "7", value: 820 },
            { argument: "8", value: 880 },
            { argument: "9", value: 710 },
            { argument: "10", value: 640 },
            { argument: "11", value: 560 },
            { argument: "12", value: 570 },
            { argument: "13", value: 590 },
            { argument: "14", value: 630 },
            { argument: "15", value: 690 },
            { argument: "16", value: 670 },
            { argument: "17", value: 580 },
            { argument: "18", value: 530 },
            { argument: "19", value: 470 },
            { argument: "20", value: 420 },
            { argument: "21", value: 320 },
            { argument: "22", value: 210 },
            { argument: "23", value: 150 },
            ],
        },
        2: { titel: "Fahrrad Aufkommen letzten 24h",
             
        data: [
        { argument: "0", value: 25 },
        { argument: "1",value: 5},
        { argument: "2",value: 3 },
        { argument: "3",value: 10 },
        { argument: "4", value: 35 },
        { argument: "5", value: 63 },
        { argument: "6", value: 230 },
        { argument: "7", value: 350 },
        { argument: "8", value: 370 },
        { argument: "9", value: 410 },
        { argument: "10", value: 390 },
        { argument: "11", value: 350 },
        { argument: "12", value: 280 },
        { argument: "13", value: 290 },
        { argument: "14", value: 330 },
        { argument: "15", value: 340 },
        { argument: "16", value: 360 },
        { argument: "17", value: 340 },
        { argument: "18", value: 270 },
        { argument: "19", value: 230 },
        { argument: "20", value: 140 },
        { argument: "21", value: 74 },
        { argument: "22", value: 56 },
        { argument: "23", value: 40 },
        ],
        },
        },
    data: {
        "Kraftfahrzeuge pro Tag" : {
            "value" : 10386,
            "unit" : "Kfz/Tag",
            "reference" : "Urban Data Hub"
        },
        "Fahrräder pro Tag" : {
            "value" : 1073,
            "unit" : "Fahrräder/Tag",
            "reference" : "Urban Data Hub"
        },
        "Geschwindigkeit" : {
            "value" : 50,
            "unit" : "km/h",
            "reference" : "Urban Data Hub"
        },
        "Straßenname" : {
            "value" : "Hauptstraße",
            "unit" : "Staßnename",
            "reference" : "Urban Data Hub"
        },
        "Anzahl Fahrstreifen" : {
            "value" : 2,
            "unit" : "Fahrstreifen",
            "reference" : "Urban Data Hub"
        },
    }
    
}

const greenAreaData = {
    title: "Grünfläche",
    text: "Es befinden sich verschiedene Grünflächen in der Stadt. Der Lindenpark schafft städtisches Grün. Der Grünstreifen auf der Hauptstraße vermindert die Feinstaub- und CO2-Emissionen. Im Wohnbereich sorgt eine kleine Parkanlage für Naherholung.",
    citizenComments : {
        1 : {
            contributor: "Erika Mustermann",
            comment: "In diesem Park fühlt man sicher sehr unsicher bei Dunkelheit."
        },
        2 : {
            contributor: "Otto Normalverbraucher",
            comment: "Ein sehr schöner Ort, hier kann man in der Mittagspause sich entspannt ausruhen. Allerdings ist es im Sommer häufig sehr voll."
        },
    },
    buttonText: "Schließen",
	sensorData : {
        1: { titel: "Personen letzten 24h",
             
            data: [
            { argument: "0", value: 24 },
            { argument: "1",value: 11},
            { argument: "2",value: 13 },
            { argument: "3",value: 8 },
            { argument: "4", value: 10 },
            { argument: "5", value: 14 },
            { argument: "6", value: 18 },
            { argument: "7", value: 28 },
            { argument: "8", value: 39 },
            { argument: "9", value: 50 },
            { argument: "10", value: 55 },
            { argument: "11", value: 68 },
            { argument: "12", value: 116 },
            { argument: "13", value: 147 },
            { argument: "14", value: 156 },
            { argument: "15", value: 170 },
            { argument: "16", value: 183 },
            { argument: "17", value: 223 },
            { argument: "18", value: 242 },
            { argument: "19", value: 170 },
            { argument: "20", value: 156 },
            { argument: "21", value: 113 },
            { argument: "22", value: 73 },
            { argument: "23", value: 33 },
            ],
        },
		2: { titel: "Außentemperatur [°C]",
             
            data: [
            { argument: "0", value: 14.4 },
            { argument: "1",value: 13.6},
            { argument: "2",value: 12.8 },
            { argument: "3",value: 12.6 },
            { argument: "4", value: 12.3 },
            { argument: "5", value: 12.4 },
            { argument: "6", value: 13.6 },
            { argument: "7", value: 15.1 },
            { argument: "8", value: 17.7 },
            { argument: "9", value: 19.6 },
            { argument: "10", value: 21.5 },
            { argument: "11", value: 24.0 },
            { argument: "12", value: 25.1 },
            { argument: "13", value: 25.4 },
            { argument: "14", value: 26.1 },
            { argument: "15", value: 26.6 },
            { argument: "16", value: 26.5 },
            { argument: "17", value: 25.5 },
            { argument: "18", value: 23.7 },
            { argument: "19", value: 21.5 },
            { argument: "20", value: 19.9 },
            { argument: "21", value: 18.5 },
            { argument: "22", value: 17.9 },
            { argument: "23", value: 16.5 },
            ],
        },
        3: { titel: "Niederschlag [mm]",
             
        data: [
        { argument: "0", value: 0 },
        { argument: "1",value: 0},
        { argument: "2",value: 0 },
        { argument: "3",value: 0 },
        { argument: "4", value: 0 },
        { argument: "5", value: 0 },
        { argument: "6", value: 0 },
        { argument: "7", value: 0 },
        { argument: "8", value: 0 },
        { argument: "9", value: 0 },
        { argument: "10", value: 0 },
        { argument: "11", value: 0 },
        { argument: "12", value: 0 },
        { argument: "13", value: 0 },
        { argument: "14", value: 0 },
        { argument: "15", value: 0 },
        { argument: "16", value: 0 },
        { argument: "17", value: 0 },
        { argument: "18", value: 0 },
        { argument: "19", value: 0 },
        { argument: "20", value: 5 },
        { argument: "21", value: 3 },
        { argument: "22", value: 0 },
        { argument: "23", value: 0 },
        ],
        },
        },
    data: {
        "Fläche" : {
            "value" : 33430,
            "unit" : "m²",
            "reference" : "Urban Data Hub"
        },
        "Anzahl der Bäume" : {
            "value" : 563,
            "unit" : "Bäume",
            "reference" : "Urban Data Hub"
        },
        "Besucher pro Tag (geschätzt)" : {
            "value" : 11400,
            "unit" : "Besucher",
            "reference" : "Urban Data Hub"
        },
    }
}

const institutionData = {
    title: "Bibliothek",
    text: "Die städtische Bibliothek wurde 1875 erbaut und ist seitdem der Ort für Kulturveranstaltungen.",
    citizenComments : {
        1 : {
            contributor: "Lieschen Müller",
            comment: "Das Gebäude ist fast 150 Jahre alt, was sich überall bemerkbar macht, es sollte dringend saniert werden."
        },
        2 : {
            contributor: "Laura Lesefreund",
            comment: "Diese Bibliothek bietet echte literarische Schätze, welche man in normalen Bibliotheken nicht findet."
        },
        3 : {
            contributor: "Max Mustermann",
            comment: "Ein guter Ort um auf Toilette zu gehen, da es sont in der Umgebung keine öffentlichen Toiletten gibt."
        },
    },
    buttonText: "Schließen",
	sensorData : {
        1: { titel: "Besucheraufkommen letzten 24h",
             
            data: [
            { argument: "0", value: 0 },
            { argument: "1",value: 0},
            { argument: "2",value: 0 },
            { argument: "3",value: 0 },
            { argument: "4", value: 0 },
            { argument: "5", value: 0 },
            { argument: "6", value: 0 },
            { argument: "7", value: 0 },
            { argument: "8", value: 73 },
            { argument: "9", value: 114 },
            { argument: "10", value: 162 },
            { argument: "11", value: 173 },
            { argument: "12", value: 121 },
            { argument: "13", value: 149 },
            { argument: "14", value: 172 },
            { argument: "15", value: 176 },
            { argument: "16", value: 169 },
            { argument: "17", value: 167 },
            { argument: "18", value: 123 },
            { argument: "19", value: 95 },
            { argument: "20", value: 78 },
            { argument: "21", value: 69 },
            { argument: "22", value: 0 },
            { argument: "23", value: 0 },
            ],
        },
		2: { titel: "ausgeliehene Bücher",
             
            data: [
            { argument: "0", value: 521 },
            { argument: "1",value: 521},
            { argument: "2",value: 521 },
            { argument: "3",value: 521 },
            { argument: "4", value: 521 },
            { argument: "5", value: 521 },
            { argument: "6", value: 521 },
            { argument: "7", value: 521 },
            { argument: "8", value: 521 },
            { argument: "9", value: 508 },
            { argument: "10", value: 493 },
            { argument: "11", value: 505 },
            { argument: "12", value: 528 },
            { argument: "13", value: 526 },
            { argument: "14", value: 537 },
            { argument: "15", value: 541 },
            { argument: "16", value: 538 },
            { argument: "17", value: 536 },
            { argument: "18", value: 543 },
            { argument: "19", value: 530 },
            { argument: "20", value: 526 },
            { argument: "21", value: 526 },
            { argument: "22", value: 526 },
            { argument: "23", value: 526 },
            ],
        },
        },
    data: {
        "Baujahr" : {
            "value" : 1875,
            "unit" : "Jahr",
            "reference" : "Urban Data Hub"
        },
        "Geschossanzahl" : {
            "value" : 6,
            "unit" : "Geschosse",
            "reference" : "Urban Data Hub"
        },
        "Sanierungen" : {
            "value" : "1926, 1953, 1982",
            "unit" : "Jahr",
            "reference" : "Urban Data Hub"
        },
        "Besucher pro Tag" : {
            "value" : 2312,
            "unit" : "Besucher",
            "reference" : "Urban Data Hub"
        },
        "Flurstück" : {
            "value" : 1658,
            "unit" : "Flurstück",
            "reference" : "Urban Data Hub"
        },
        "Öffnungszeiten  " : {
            "value" : "8:00 - 19:00",
            "unit" : "Uhrzeit",
            "reference" : "Urban Data Hub"
        },
    }
}

const residentialData = {
    title: "Wohngebäude",
    text: "Das Wohngebäude wurde an der Ecke Hauptstraße/Fußgängerzone wurde 1921 erbaut und bietet heute Platz für 30 Parteien.",
    buttonText: "Schließen",
    citizenComments : {
        1 : {
            contributor: "Jan Janssen",
            comment: "Das ist ein wunderschönes Haus, aber die Mieten sind viel zu hoch!"
        },
        2 : {
            contributor: "Harry Holland",
            comment: "Die vorbeifahrenden Züge der Hochbahn sind sehr laut und fahren bis tief in die Nacht."
        }
    },
	sensorData : {
        1: { titel: "Solarstromeinspeisung [kWh] letzten 24h",
             
            data: [
            { argument: "0", value: 0 },
            { argument: "1",value: 0},
            { argument: "2",value: 0 },
            { argument: "3",value: 0 },
            { argument: "4", value: 0 },
            { argument: "5", value: 0.2 },
            { argument: "6", value: 0.5 },
            { argument: "7", value: 0.8 },
            { argument: "8", value: 1.4 },
            { argument: "9", value: 1.7 },
            { argument: "10", value: 2.1 },
            { argument: "11", value: 2.9 },
            { argument: "12", value: 3.5 },
            { argument: "13", value: 3.6 },
            { argument: "14", value: 3.9 },
            { argument: "15", value: 4.1 },
            { argument: "16", value: 3.7 },
            { argument: "17", value: 3.5 },
            { argument: "18", value: 2.4 },
            { argument: "19", value: 1.7 },
            { argument: "20", value: 0.9 },
            { argument: "21", value: 0.2 },
            { argument: "22", value: 0 },
            { argument: "23", value: 0 },
            ],
        },
		2: { titel: "Geräuschpegel [dB]",
             
            data: [
            { argument: "0", value:31 },
            { argument: "1",value: 29},
            { argument: "2",value: 30 },
            { argument: "3",value: 29 },
            { argument: "4", value: 30 },
            { argument: "5", value: 31 },
            { argument: "6", value: 34 },
            { argument: "7", value: 36 },
            { argument: "8", value: 41 },
            { argument: "9", value: 45 },
            { argument: "10", value: 51 },
            { argument: "11", value: 50 },
            { argument: "12", value: 47 },
            { argument: "13", value: 51 },
            { argument: "14", value: 49 },
            { argument: "15", value: 51 },
            { argument: "16", value: 48 },
            { argument: "17", value: 49 },
            { argument: "18", value: 47 },
            { argument: "19", value: 45 },
            { argument: "20", value: 41 },
            { argument: "21", value: 39 },
            { argument: "22", value: 35 },
            { argument: "23", value: 33 },
            ],
        },
        },
    data: {
        "Baujahr" : {
            "value" : 1921,
            "unit" : "Jahr",
            "reference" : "Urban Data Hub"
        },
        "Wohnfläche" : {
            "value" : 1720,
            "unit" : "m²",
            "reference" : "Urban Data Hub"
        },
        "Geschossanzahl" : {
            "value" : 5,
            "unit" : "Geschosse",
            "reference" : "Urban Data Hub"
        },
        "Anzahl Wohneinheiten" : {
            "value" : 30,
            "unit" : "Wohneinheiten",
            "reference" : "Urban Data Hub"
        },
        "Einwohner" : {
            "value" : 78,
            "unit" : "Einwohner",
            "reference" : "Urban Data Hub"
        },
        "Energieeffizienzklasse" : {
            "value" : "C",
            "unit" : "Energieeffizienzklasse",
            "reference" : "Urban Data Hub"
        },
        "installierte Photovoltaikleistung" : {
            "value" : 12,
            "unit" : "kWp",
            "reference" : "Urban Data Hub"
        },
        "Flurstück  " : {
            "value" : 1319,
            "unit" : "Flurstück",
            "reference" : "Urban Data Hub"
        },
    }
}

const officeData = {
    title: "Bürogebäude",
    text: "Im modernen Bürogebäude mischen sich private und städtische Nutzungen.",
    buttonText: "Schließen",
    citizenComments : {
        1 : {
            contributor: "Mary Major",
            comment: "Von oben hat man einen wunderschönen Ausblick!"
        },
    },
    sensorData : {
        1: { titel: "Stromverbrauch [kWh] letzten 24h",
             
            data: [
            { argument: "0", value: 4.3 },
            { argument: "1",value: 3.2},
            { argument: "2",value: 3.6 },
            { argument: "3",value: 3.4 },
            { argument: "4", value: 3.7 },
            { argument: "5", value: 3.5 },
            { argument: "6", value: 3.9 },
            { argument: "7", value: 4.6 },
            { argument: "8", value: 5.4 },
            { argument: "9", value: 9.3 },
            { argument: "10", value: 10.4 },
            { argument: "11", value: 10.1 },
            { argument: "12", value: 11.6 },
            { argument: "13", value: 12.2 },
            { argument: "14", value: 11.9 },
            { argument: "15", value: 12.4 },
            { argument: "16", value: 12.2 },
            { argument: "17", value: 10.9 },
            { argument: "18", value: 10.1 },
            { argument: "19", value: 7.5 },
            { argument: "20", value: 6.8 },
            { argument: "21", value: 5.9 },
            { argument: "22", value: 5.1 },
            { argument: "23", value: 4.9 },
            ],
        },
		2: { titel: "Außentemperatur [°C]",
             
            data: [
            { argument: "0", value: 16.4 },
            { argument: "1",value: 14.6},
            { argument: "2",value: 13.8 },
            { argument: "3",value: 13.6 },
            { argument: "4", value: 13.3 },
            { argument: "5", value: 13.4 },
            { argument: "6", value: 14.6 },
            { argument: "7", value: 16.1 },
            { argument: "8", value: 18.7 },
            { argument: "9", value: 21.6 },
            { argument: "10", value: 23.5 },
            { argument: "11", value: 26.0 },
            { argument: "12", value: 27.1 },
            { argument: "13", value: 27.4 },
            { argument: "14", value: 28.1 },
            { argument: "15", value: 28.6 },
            { argument: "16", value: 28.5 },
            { argument: "17", value: 27.5 },
            { argument: "18", value: 25.7 },
            { argument: "19", value: 23.5 },
            { argument: "20", value: 21.9 },
            { argument: "21", value: 20.5 },
            { argument: "22", value: 18.9 },
            { argument: "23", value: 17.5 },
            ],
        },
        3: { titel: "Belegte Pkw Stellplätze",
             
        data: [
        { argument: "0", value: 12 },
        { argument: "1",value: 9},
        { argument: "2",value: 8 },
        { argument: "3",value: 8 },
        { argument: "4", value: 8 },
        { argument: "5", value: 11 },
        { argument: "6", value: 18 },
        { argument: "7", value: 25 },
        { argument: "8", value: 45 },
        { argument: "9", value: 101 },
        { argument: "10", value: 132 },
        { argument: "11", value: 160 },
        { argument: "12", value: 168 },
        { argument: "13", value: 183 },
        { argument: "14", value: 172 },
        { argument: "15", value: 163 },
        { argument: "16", value: 151 },
        { argument: "17", value: 133 },
        { argument: "18", value: 103 },
        { argument: "19", value: 76 },
        { argument: "20", value: 32 },
        { argument: "21", value: 23 },
        { argument: "22", value: 19 },
        { argument: "23", value: 15 },
        ],
        },
        },
    data: {
        "Bruttogeschossfläche" : {
            "value" : 456,
            "unit" : "m2",
            "reference" : "Urban Data Hub"
        },
        "Geschossanzahl" : {
            "value" : 22,
            "unit" : "Geschosse",
            "reference" : "Urban Data Hub"
        },
        "Gebäudehöhe" : {
            "value" : 63,
            "unit" : "m",
            "reference" : "Urban Data Hub"
        },
        "Twitterdaten" : {
            "value" : 254,
            "unit" : "Einträge",
            "reference" : "Twitter"
        },
        "Flurstück  " : {
            "value" : 2324,
            "unit" : "Flurstück",
            "reference" : "Urban Data Hub"
        },
    }
}

const waterData = {
    title: "Wasserfläche",
    text: "Die Wasserfläche 'An der Linde' wurde bei einem umfassenden Stadtumbau im Jahr 2013 geschaffen und lädt seitdem zum Verweilen ein - im Winter zum Schlittschuhlaufen und im Sommer zum innerstädtischen Erfrischen. ",
    citizenComments : {
        1 : {
            contributor: "Jane Public",
            comment: "Das neue Gewässer ist ist super, früher gab es in der Umgebung keine Gewässer."
        },
        2 : {
            contributor: "Erika Musterfrau",
            comment: "Dieser See wurde für viel Geld angelegt und verbaucht sehr viel zu viel Wasser."
        },
    },
	sensorData : {
        1: { titel: "Wassertemperatur letzten 24h",
             
            data: [
            { argument: "0",  value: 21.3 },
            { argument: "1",  value: 21.1},
            { argument: "2",  value: 21.0 },
            { argument: "3",  value: 20.9 },
            { argument: "4",  value: 20.8 },
            { argument: "5",  value: 20.7 },
            { argument: "6",  value: 20.7 },
            { argument: "7",  value: 20.6 },
            { argument: "8",  value: 20.6 },
            { argument: "9",  value: 20.7 },
            { argument: "10", value: 20.4 },
            { argument: "11", value: 20.6 },
            { argument: "12", value: 20.9 },
            { argument: "13", value: 21.1 },
            { argument: "14", value: 21.2 },
            { argument: "15", value: 21.4 },
            { argument: "16", value: 21.4 },
            { argument: "17", value: 21.5 },
            { argument: "18", value: 21.5 },
            { argument: "19", value: 21.5 },
            { argument: "20", value: 21.5 },
            { argument: "21", value: 21.4 },
            { argument: "22", value: 21.4 },
            { argument: "23", value: 21.4 },
            ],
        },
        },
    buttonText: "Schließen",
    data: {
        "Gewässervolumen" : {
            "value" : 14460,
            "unit" : "m³",
            "reference" : "Urban Data Hub"
        },
        "Baujahr" : {
            "value" : 2013,
            "unit" : "Jahr",
            "reference" : "Urban Data Hub"
        },
        "Maximale Gewässertiefe" : {
            "value" : 4.3,
            "unit" : "m",
            "reference" : "Urban Data Hub"
        }
    }
}

const bridgeData = {
    title: "Hochbahn",
    text: "Die Hochbahn verbindet das Viertel mit dem überregionalen Verkehrssystem.",
    citizenComments : {
        1 : {
            contributor: "Bert Bürger",
            comment: "Diese U-Bahn Linie eignet sich auch sehr gut als Stadtrundfahrt, da man über weite Strecken oberirdisch fährt und immer einen tollen Blick hat."
        },
        2 : {
            contributor: "Ella Einwohner",
            comment: "Die Züge sind in der Hauptverkehrszeit meistens sehr voll."
        },
    },
    buttonText: "Schließen",
		sensorData : {
        1: { titel: "Fahrgäste letzten 24h",
             
            data: [
            { argument: "0",  value: 170 },
            { argument: "1",  value: 80},
            { argument: "2",  value: 0 },
            { argument: "3",  value: 0 },
            { argument: "4",  value: 0 },
            { argument: "5",  value: 110 },
            { argument: "6",  value: 240 },
            { argument: "7",  value: 390 },
            { argument: "8",  value: 750 },
            { argument: "9",  value: 1200 },
            { argument: "10", value: 1100 },
            { argument: "11", value: 980 },
            { argument: "12", value: 730 },
            { argument: "13", value: 680 },
            { argument: "14", value: 880 },
            { argument: "15", value: 980 },
            { argument: "16", value: 1050 },
            { argument: "17", value: 980 },
            { argument: "18", value: 710 },
            { argument: "19", value: 560 },
            { argument: "20", value: 520 },
            { argument: "21", value: 450 },
            { argument: "22", value: 320 },
            { argument: "23", value: 280 },
            ],
        },
        },
    data: {
        "Fahrgäste pro Tag" : {
            "value" : 163000,
            "unit" : "Fahrgäste/Tag",
            "reference" : "Hochbahn"
        },
        "Züge pro Tag" : {
            "value" : 362,
            "unit" : "Züge/Tag",
            "reference" : "Hochbahn"
        },
        "Baujahr" : {
            "value" : 1913,
            "unit" : "Jahr",
            "reference" : "Hochbahn"
        }
    }
}



exports.streetData = streetData
exports.greenAreaData = greenAreaData
exports.institutionData = institutionData
exports.residentialData = residentialData
exports.officeData = officeData
exports.waterData = waterData
exports.bridgeData = bridgeData