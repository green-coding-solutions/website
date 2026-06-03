---
title: "Measure Once, Model Everywhere: Model-Based Per-Request Resource Consumption for HTTP"
link: ""
date: 2026-06-23
draft: false
type: "publication"
magazine: "LIMITS 2026"
---
Jüngste Vorschläge zur nachhaltigkeitsbezogenen Offenlegung über HTTP konzentrieren sich darauf, welche Umweltinformationen an der Protokollgrenze übertragen werden sollen, lassen aber offen, wie sich solche Werte pro Anfrage in realen Deployments erzeugen lassen. Wir stellen einen modellbasierten Ansatz vor, der Ressourcenverbrauch und CO2e pro HTTP-Anfrage schätzt, ohne feingranulare Energiemessung im Produktivbetrieb zu erfordern. Endpunkte werden offline unter kontrollierten Bedingungen vermessen, um kompakte Energiemodelle abzuleiten, die online an der HTTP-Servergrenze ausgewertet werden. Wir implementieren dies als nginx-Erweiterung, die eine JSON-Modell-Registry lädt und pro Anfrage Metadaten zu Energie, Netz-Intensität, eingebetteten Emissionen und Gesamtwirkung ausgibt—bei nur geringem Laufzeit-Overhead.
