# The Radiating Future

or something

## 2018-07-31

### Broadcasting Power

The map [here](https://map.geo.admin.ch/?topic=funksender) only shows 
broadcasting power in words.

The translation could be found [here](https://www.bakom.admin
.ch/bakom/de/home/frequenzen-antennen/standorte-von-sendeanlagen/erlaeuterungen-zur-uebersichtskarte.html):

> - "sehr klein": Die Gesamtleistung liegt im Bereich zwischen 1 und 10 W
> - "klein": Die Gesamtleistung liegt im Bereich zwischen 10 und 100 W
> - "mittel": Die Gesamtleistung liegt im Bereich zwischen 100 und 1000 W
> - "gross": Die Gesamtleistung liegt im Bereich oberhalb 1 kW.  
     Grössere Leistungen als einige 1000 W werden bei GSM-, 3G- und 4G-Basisstationen in der Regel nicht ausgesendet.

|words        | power     |
|------------ | --------- |
|"sehr klein" | 1–10W     |
|"klein"      | 10–100W   |
|"mittel"     | 100–1000W |
|"gross"      | >1000W    |

So, basically, we have a log scale here, I'd say.

### Broadcasting range
Next question: how do we figure out the broadcasting range? So far, I haven't found much of a conclusive answer, since it depends on so many other variables, among them the frequency (which is information I don't have). Maybe this could help: https://en.wikipedia.org/wiki/Cellular_network. Other answers are here: https://www.quora.com/What-is-a-cell-towers-range

## 2018-08-02
Saving new layers in QGIS in memory means that they will be gone the next time you open the project.

Well. That was unfortunate. Seems like I have to try and redo that analysis.

## 2018-08-05
Okay, let's take another shot at this problem, and produce an "update" with it.

Right – since I don't have the broadcast ranges, I changed the visualisation to soft, fluffy clouds.