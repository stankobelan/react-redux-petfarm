import React from "react";

const About = (props: any) => {

    return (<div className="container">

            Pes a mačka
            <ul>
                <li> Na serveri vytvorit C# model pre psa, mačku a majitela, ktory vlastni psy a macky. Pes a
                    macka nech maju spolocnu property “PocetKrmeni” a „DatumNarodenia“ (kludne aj ine).
                </li>
                <li> Navrhnut graficky DB model pre tuto situaciu (MSSQL) + vytvorenie DB a tabuliek. Naplnit
                    do DB zoznam 15 psov a 15 maciek.
                </li>
                <li> Navrhnut UI v reacte – na uvodnej obrazovke bude zoznam majitelov – nacitanych z DB. Po
                    kliku na majitela sa majitel akokeby “rozklikne” alebo “expanduje” dole a zobrazia sa
                    podrobne info o majitelovi a vykreslia sa vsetky jeho psy a macky (nech je osobitna
                    komponenta na psa a na macku). Pri kazdom zvierati zobrazit aj jeho vek vo formate napr „6
                    rokov 2 mesiace 8 dní“ (nie len datum narodenia) a pocet krmeni + dalsie properties. Tento
                    vek generovat vo frontende. Pri majitelovi sa taktiez zobrazi priemerny vek jeho zvierat.
                    Plus zobrazit aj dalsie majitelove properties.
                </li>
                <li> Kazdy pes a macka budu mat tlacidlo Nakrmit, tymto sa inkrementuje pocet nakrmeni daneho
                    zvierata. Toto sa odosle na server a ulozi sa to aj v DB.
                </li>
                <li> Kazdy majitel bude mat v sebe edit tlacidlo – po kliku sa otvori nove modalne okno, v
                    ktorom sa bude dat editovat majitel, jeho zoznam psov a maciek. Rovnako tak sa bude dat
                    vytvorit aj novy majitel a bude sa mu dat priradit psy a macky. Psy a macky netreba vytvarat
                    novych – vzdy sa bude dat vybrat zo zoznamu, ktory je ulozeny v DB. Pre jednoduchost
                    neriesme ci viacero majitelov vlastni rovnake zviera – riesit budeme len to aby 1 majitel
                    nemal viac krat priradene rovnake zviera.
                </li>
                <li> Po ulozeni editovaneho majitela sa odosle poziadavka na server, server vygeneruje SQL
                    prikazy a updatne majitela aj v DB. Na edit/insert moze byt bud jedna funkcia (server pozrie
                    do DB a zisti ci robit edit alebo insert) alebo mozu byt kludne aj dve osobitne.
                </li>
            </ul>

    </div>);
}
export default About;
