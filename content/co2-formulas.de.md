---
title: "CO2 Formulas"
draft: false
summary: "Formeln zur Umrechnung von GB in CO2e oder von kWH in CO2e usw."
date: 2022-07-21 08:00:00
author: "Arne Tarara"
authorlink: "https://de.linkedin.com/in/arne-tarara"

---

Bei der Verwendung von Software ist die typische Einheit, die wir direkt erleben, oft die Zeit. Software ist entweder schnell oder langsam,
aber wir denken in der Regel nicht über den CO2-Fußabdruck von Software nach.

Software verbraucht Energie durch die Nutzung der zugrundeliegenden Hardware (in der Regel in Watt gemessen). Diese Watt müssen irgendwoher kommen, und wir werden sehen, dass jede Energiemenge in der Regel mit einem CO2 verbunden ist.

Auch Software verbraucht Energie, wenn sie Netzwerkanfragen stellt, und ist indirekt für den "embodied carbon" verantwortlich, d. h. das CO2, das bei der Herstellung der von ihr verwendeten Hardware freigesetzt wird.

Auf dieser Seite wollen wir beleuchten, wie man von typischen Werten wie **Zeit** oder **Megabyte** zu **kWh** und schließlich zu **CO2** kommt.

{{< rawhtml >}}
                </div>
            </div>
    </section><!-- end about -->
    <section class="single-page bg-two" style=""><div id="ancla1"></div>
        <div class="section-two">
            <div class="title-two">Liste von CO2 Formeln</div>
            <div class="separator"><div class="line line-1"></div></div>
            <div class="data-content-one">
                <div class="ui segment">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#gigabytes-to-kwh" id="gigabytes-to-kwh">
                            <h3 style="color: #fff;">Gigabytes zu kwH</h3>
                        </a>
                    </div>
                    <p></p>
                    <img class="ui large floated right rounded bordered image" src="/img/co2-formulas/boundaries_network_emissions.webp">
                    <p>Wenn Sie die Kosten für die Übertragung einer Datenmenge über das Internet beziffern wollen, müssen Sie jeden Schritt des Pakets messen und die Kosten für Router, Kabel, Sendemasten usw. addieren.</p>
                    <p>Da diese Messdaten nicht zur Verfügung stehen, wird eine Heuristik verwendet, die die Kosten der gesamten Netzausrüstung, durch die die Daten fließen müssen, auf der Grundlage der tatsächlich übertragenen Datenmenge in GB schätzt.</p>
                    <p>Wenn Sie den Wert bereits in GB haben, können Sie ihn einfach mit einem konstanten Faktor in kWh umrechnen.</p>
                    <p>Diese scheinbar einfache Formel enthält jedoch eine Menge Annahmen und verwendet Durchschnittswerte.</p>
                    <p>Typischerweise folgen diese Ansätze entweder einem Top-Down-Ansatz, bei dem die Stromrechnung eines Telekommunikationsanbieters und dann die Netzübertragungsberichte betrachtet werden, um die beiden Zahlen zu teilen.</p>
                    <p>Andere Ansätze bestehen darin, den Weg einiger Beispiel-Pakete wirklich zu verfolgen und jedes einzelne Netzgerät auf dem Weg zu untersuchen und dann den Stromverbrauch nur für die Übertragung zu ermitteln.</p>
                    <p>Es gibt auch andere Ansätze, aber alle haben Vor- und Nachteile.  Die Zahl <strong>0.06 kWh / GB</strong> ist bereits ein Mix, die das Beste aus all diesen Ansätzen herausholen soll.</p>
                    <p>In der Studie, die in der unten angegebenen Quelle [1] verlinkt ist, wird auch darauf hingewiesen, dass die Stromintensität durch Fortschritte bei der Effizienz alle zwei Jahre um etwa die Hälfte sinkt, und es wird angenommen, dass eine Extrapolation für die kommenden Jahre eine gültige Annahme sein könnte. Dies bring den Wert für den Umrechnungsfaktor in <strong>2023</strong> runter auf <strong>0.00375 kWH / GB</strong></p>
                    <p>Dieses Modell ist jedoch nicht ohne Kritik, da die meisten Netzwerkkomponente ca. 80 % ihrer maximalen Leistungsaufnahme bereits im Leerlauf verbrauchen. Der Rest ist ein proportionaler Faktor, der von der Nutzung der möglichen Bandbreite abhängt. Es gibt Ansätze um dieser Realität der tatsächlichen Stromkosten für Anwendungen, die das Netzwerk nutzen, besser abzubilden, doch haben diese sog. Time-Sharing- oder Data-Sharing-Modelle alle unterschiedliche Nachteile [2].</p>
                    <p>Wir haben uns entschieden, in unseren Tools den linearen Ansatz der Zuordnung von Netzübertragungen zum Stromverbrauch zu verwenden. Dieser bietet für den Nutzer den besten Anreizden Netzverkehr auf ein Minimum zu beschränken. Unabhängig davon, welche der derzeit bekannten Berechnungsmethoden verwendet wird, ist sie immer noch ungenau. Keine der derzeitigen Methoden kann die tatsächlichen Kosten für die Bereitstellung neuer Hardware für die Bandbreitenerhöhung zuverlässig vorraussagen. Der zusätzliche CO2-Ausstoß fällt nämlich immer erst dann wenn neue Netzwerkkomponente hinzugefügt werden. Nicht wenn mehr Datentraffic entsteht.</p>
                    <h3>Betrachtete Netzwerkkomponente</h3>
                    <p>Wichtig für das Verständnis und die Vergleichbarkeit der berechenten Werte ist welche Teile des Netzwerk in die Betrachung mit einbezogen werden. In der Abbildung rechts sehen Sie die einbezogenen Komponenten. <strong>Nur das Zugangsnetz und das IP-Kernnetz sind enthalten</strong>, d.h. die Verbindung zwischen Rechenzentren und Telekommunikationsanbietern.</p>
                    <p>Nicht enthalten sind die Teile innerhalb der Rechenzentren und auch keine Endnutzergeräte oder deren WLAN/LAN im Haus. Die Berechnung geht nur bis zur *Bordsteinkante*.</p>
                    <p>Ebenfalls wichtig: <strong>Nur Festnetzübertragungen</strong> sind hier enthalten. Kein mobiler Datenverkehr, der in der Regel mindestens um das 2-3fache energieintensiver ist.</p>
                    <h3>Wert in Gigabytes</h3>
                    <div class="ui mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">Gigabytes</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">0.06</div>
                            <div class="label">GB / kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">0.06</div>
                            <div class="label">kWH</div>
                        </div>
                    </div>
                    <p>Wenn Ihr Wert in Megabytes angegeben ist, muss der Umrechnungsfaktor durch folgende Zahl geteilt werden <strong>1.000</strong> und ergibt sich zu <strong>0.00006 MB / kWh</strong></p>
                    <p>[1] <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630">Untangling the estimates</a></p>
                    <p>[2] <a href="https://github.com/intarchboard/e-impact-workshop-public/blob/main/papers/Schien_Rethinking-Allocation-v2.pdf">Daniel Schien, Paul Shabajee, Chris Preist. “Rethinking Allocation in High-Baseload Systems: A Demand-Proportional Network Electricity Intensity Metric.”</a></p>
                </div>
                <!-- end segment -->
                <div class="ui segment">
                    <div class="header">
                        <a class="ui yellow ribbon label" href="#from-kwh-to-co2e" id="from-kwh-to-co2e">
                            <h3 style="color: #fff;">From kWh to CO2e</h3>
                        </a>
                    </div>
                    <p></p>
                    <img class="ui large floated right rounded bordered image" src="/img/co2-formulas/electricitymap_de.webp">
                    <p>Diese Umrechnung ist wahrscheinlich die relevanteste.</p>
                    <p>Damit meinen wir, dass die Unternehmen bereits die aktuelle Intensität ihres Netzes kennen und die Arbeitsbelastung entsprechend planen wollen.</p>
                    <p>Die aktuelle Intensität des Stromnnetztes kann z.B. über <a href="https://app.electricitymaps.com/zone/DE">Electricitymap.com</a> abgerufen werden. In unseren Fall, in Deutschland, ist der Wert <strong>317 gCO2e/kWh</strong></p>
                    <h3>Weltweite durchschnittliche Stromnnetzintensität</h3>
                    <p>Wenn Ihre Workload über mehrere Länder verteilt ist oder Sie überhaupt nicht wissen, wo Ihre Arbeitslast läuft, dann ist es am besten, den globalen Durchschnitt zu nehmen.</p>
                    <p>Für 2021 ist dieser Wert: <strong>442 gCO2e/kWh</strong></p>
                    <p>Setzt man diese Zahl in eine Berechnung ein, die mit kWh beginnt, kommt man direkt auf gCO2e, was Gramm CO2-Äquivalent bedeutet. Da nicht jeder chemische Prozess reines CO2 erzeugt, werden diese alle auf das äquivalente Klimaerwärmungspotenzial von CO2 umgerechnet, was zu CO2e führt</p>
                    <div class="ui five mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">x</div></div>
                        <div class="statistic">
                            <div class="value">442</div>
                            <div class="label">gCO2e/kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">442</div>
                            <div class="label">gCO2e</div>
                        </div>
                    </div>
                    <p>Quelle: <a href="https://ember-climate.org/insights/research/global-electricity-review-2022/">Ember Climate</a></p>
                </div>
                <!-- end segment -->
                <div class="ui segment" id="calculating-savings">
                    <div class="header">
                        <a class="ui blue ribbon label" href="#from-joules-to-kwh" id="from-joules-to-kwh">
                            <h3 style="color: #fff;">Von Joules zu kwH</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>Einige Energie-Mess-Tools (wie z.B. <strong>Intel RAPL</strong>) geben *Joules* als Ausgabewert.</p>
                    <p>Der tatsächliche SI-Einheitswert von Joule ist Ws. Um also auf kWh zu kommen, muss man zuerst auf Stunden (60*60) kommen und dann auf *Kilo*, was bedeutet, dass man durch tausend dividieren muss</p>
                    <h3>Joules zu kWh</h3>
                    <div class="ui ten mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">Joule</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">/</div></div>
                        <div class="statistic">
                            <div class="value">(60*60)</div>
                            <div class="label">(um Stunden zu bekommen)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">/</div></div>
                        <div class="statistic">
                            <div class="value">(1.000)</div>
                            <div class="label">(um *kilo* zu bekommen)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">0.000000277...</div>
                            <div class="label">kWH</div>
                        </div>
                    </div>
                    <p>Und umgekehrt:</p>
                    <h3>kWh zu Joules</h3>
                    <div class="ui eight mini statistics">
                        <div class="statistic">
                            <div class="value">1</div>
                            <div class="label">kWh</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">*</div></div>
                        <div class="statistic">
                            <div class="value">(60*60)</div>
                            <div class="label">(Stunden auskürzen)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">*</div></div>
                        <div class="statistic">
                            <div class="value">(1.000)</div>
                            <div class="label">(*kilo* auskürzen)</div>
                        </div>
                        <div class="statistic gc-stats-multiply"><div class="value">=</div></div>
                        <div class="statistic">
                            <div class="value">3.600.000</div>
                            <div class="label">Joules</div>
                        </div>
                    </div>
                </div>
                <!-- end segment -->
                <div class="ui segment">
                    <div class="header">
                        <a class="ui green ribbon label" href="#from-specs-to-kwh" id="from-specs-to-kwh">
                            <h3 style="color: #fff;">Von TDP zu kWh</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>Wenn Sie die Wattzahl nicht direkt messen können (mit einem externen Leistungsmesser, Intel RAPL usw.), können Sie immer Datenblätter oder Benchmarks verwenden und interpolieren, um Ihren Leistungswert zu ermitteln.</p>
                    <p>Ein naiver Ansatz zur Schätzung des Energieverbrauchs eines Prozessors wäre die Verwendung seiner Thermal Design Power (TDP).</p>
                    <p>Dies gibt Ihnen einen ersten Eindruck davon, in welcher Größenordnung Ihr erwarteter Energiewert liegt.</p>
                    <p>Beispiel: Der <a href="https://ark.intel.com/content/www/de/de/ark/products/84993/intel-core-i75557u-processor-4m-cache-up-to-3-40-ghz.html"><strong>Intel i7-5557U</strong> hat einen TDP von <strong>28 W</strong></a></p>
                    <p>Wenn wir eine Berechnung von 5 Sekunden durchführen würde, würden wir einen Energieverbrauch von  <strong>140 Ws</strong> (28 W * 5 s), aka <strong>140 J</strong> erwarten .</p>
                    <p>Wenn man sich eine <a href="https://metrics.green-coding.io/stats.html?id=280ab840-a360-481f-8be7-b2712fde6281">CPU Messung</a> von einem vollen CPU Workload anguckt wird man sehen das der Wert jedoch real eher bei <strong>~60 J</strong> liegt .</p>
                    <p>Daraus können wir schließen, dass die TDP eine sehr grobe Schätzung ist und als gute Obergrenze dient. Aber es überschätzt die tatsächliche Energie um einiges.</p>
                </div>
                <!-- end segment -->
                <div class="ui segment">
                    <div class="header">
                        <a class="ui green ribbon label" href="#">
                            <h3 style="color: #fff;">From Benchmarks to kWh</h3>
                        </a>
                    </div>
                    <p></p>
                    <p>Ein Benchmark ist eine weitere Möglichkeit, von der Laufzeit auf kWh zu gelangen.</p>
                    <p>TODO</p>
                    <p>Quelle: <a href="https://github.com/cloud-carbon-footprint/cloud-carbon-coefficients">David Mytton</a></p>
                </div>
                <!-- end segment -->
{{< /rawhtml >}}
