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

## 2018-08-07
Another test, this time taking the three technologies apart – are there any differences?

## Bookmarks

- https://www.frequencycheck.com/countries/switzerland
- https://en.wikipedia.org/wiki/LTE_frequency_bands
- https://en.wikipedia.org/wiki/UMTS_frequency_bands
- https://en.wikipedia.org/wiki/GSM_frequency_bands
- https://de.wikipedia.org/wiki/Effektive_Strahlungsleistung
- https://en.wikipedia.org/wiki/Cellular_network
- https://www.quora.com/What-is-a-cell-towers-range

# Text
With nearly every household in Switzerland having at least one mobile phone, the freedom to make phone calls, send texts and access the Internet without  the constraints of any wires has taken the country by storm. Yet most people will forget what it takes to make this ease of access possible.  With antennas tucked away on rooftops and camouflaged as trees, few people think how much data is zipping around in the air around us.

 There are some though that are concerned about the increasing number of mobile phone towers that are being erected in order to satisfy the demand for ever more bandwidth. They fear that the electromagnetic waves have an adverse effect on the human body; that it might, amongst other things, cause cancer.

As the following maps show, it is indeed hard to find a place in Switzerland that has no coverage.

The distribution follows a simple economical pattern:  where there are people, there will be mobile phone antennas. 

If you are on the lookout for some peace and quiet, either from electromagnetic radiation or from the demands of an always-on smartphone on your attention,  you should go for corners with as little population as possible. Of course, these might be hard to find in Switzerland where are even the most remote valley has its own winter sports resort.

 The other, more radical approach, of course, would be to move into the Radio Quiet Zone, like the one in Virginia. Unfortunately, with its small size, it is unlikely that Switzerland will ever get one of those.