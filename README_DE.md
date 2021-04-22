# The Things Stack V3 tabs Dekoder
Der Dekoder ist in javascript Programmiersprache geschrieben und kann für alle aktuellen Tabs Sensoren vom Hersteller Browan verwendet werden, um in der TTNS Konsole die empfangenen Datensätze lesbar zu machen.

### unser Dekoder unterstützt derzeit folgende Tabs Sensoren:
- Tür/Fenster Sensor (TBDW - [Link to BROWAN Productpage](https://www.browan.com/product/door-window-sensor/detail))
- Bewegungssensor (PIR) (TBMS - [Link to BROWAN Productpage](https://www.browan.com/product/motion-sensor-pir/detail))
- Healthy Home Sensor IAQ (TBHV - [Link to BROWAN Productpage](https://www.browan.com/product/healthy-home-sensor-iaq/detail))
- Temperatur- und Luftfeuchtigkeitssensor (TBHH - [Link to BROWAN Productpage](https://www.browan.com/product/temperature-humidity-sensor/detail))
- Ambient Light Sensor (TBAM - [Link to BROWAN Productpage](https://www.browan.com/product/ambient-light-sensor/detail))
- Schallpegel Sensor (TBSL - [Link to BROWAN Productpage](https://www.browan.com/product/sound-level-sensor/detail))
- Water Leak Sensor (TBWL - [Link to BROWAN Productpage](https://www.browan.com/product/water-leak-sensor/detail))
- Objektfinder (TBOL - [Link to BROWAN Productpage](https://www.browan.com/product/object-locator/detail))

### Dieser Dekoder unterscheidet sich nur geringfügig vom alten Dekoder, der bisher im V2 stack verwendet wurde!
Um den Dekoder einzubauen wählt man innerhalb der bereits angelegten Applikation im V3 Stack links im Menü den Punkt "Payload formatters" aus. (Wenn noch keine Applikation erstellt ist muß das natürlich vorher erledigt werden) Im Untermenü wird nun "Uplink" als Nachrichtenmethode gewählt, als Typ vom Dekoder wird Javascript ausgewählt. Nun kann mit Copy&Paste der Inhalt unserer .js Datei in das Textfeld eingefügt werden. (Anmerkung: der im Feld bereits vorhandene Code wird vorher gelöscht oder überschrieben). Abschließend klickt man unten auf "Save changes" - ab sofort werden alle Nachrichten vom Sensor lesbar dargestellt. Eine Weiterverarbeitung (Beispiel per MQTT Integration nach node-red ist nun einfach möglich, da ein lesbares JSON Objekt übergeben wird). Hierbei ist keine Unterscheidung der Sensor-Typen nötig, da unser Decoder für alle Sensoren geschrieben wurde. Daher können in einer Applikation unterschiedliche Sensoren aus der Tabs Familie registriert- und gemeinsam mit einem Dekoder lesbar gemacht werden.

### Was man wissen sollte:
- der Schalldruck-Sensor (TBSL) kann zwischen 40dBA und 100dBA messen - ist der Meßwert außerhalb dieses Berichs, wird ein Fehlercode (Zahl 255) übermittelt. Abhängig vom Umgebungsgeräuschlevel können so bei späterer Auswertung der Messungen scheinbare Ausreisser in der Meßwertetabelle / Grafik auftreten. Befindet man sich beispielsweise in einem sehr ruhigen Büro oder der Sensor liegt in einem temporär ungenutzten Raum, so fällt der Wert unter 40dBA und als Meßwert wird 255 gesendet. Hier kann einfach per Funktion im Nachgang dieser Wert 255 durch 0 ersetzt werden - das eliminiert diese Spitzen nach oben und setzt den Geräuschlevel auf (theoretische) 0 dBA.
- betrifft: Healthy Home Sensor IAQ (TBHV), Schalldruck Sensor (TBSL), Temperature & Feuchtigkeitssensor (TBHH) and Leckage Sensor (TBWL): diese Sensoren geben als Fehlercode 255 aus, wenn die Messwerte außerhalb des angegeben Meßbereichs sind. 

This decoder is licensed by the AGPL-3.0 License, please have a look at the LICENSE file.
