//const fs = require("fs");
const puppeteer = require("puppeteer");
const request = require("request-promise");

//const axios = require("axios");

// para buscar elementos dentro de html
//const cheerio = require("cheerio");

(async () => {
    // agregar mas ids si es posible
    // SON LAS CUENTAS DE PUTAS QUE BUSCAR Y ENCONTRAR EN LOS CHATS DIRECTOS DE YT

    var canal_puta_ini = "https://www.youtube.com/channel/";
    // agregar o quitar este ARRAY segun necesidad
    // "UCbeSWjbTtmEP2kwuT0Sh6pA", // en id canal de marcio

    var puta_ids = [
        "UCeE8-d3AVtpaQTqKsnlTbng",
        "UCCyezB3yAjtexgicVam6bVg",
        "UCD8xxEDZXQqTG1DNeT5atlg",
        "UChZFFCN6C4Q-_JaFHWOexIA",
        "UCeTWwSd6GVtFzhBHffi0vYA", // MIL PUTAS karla pinzon
        "UCuBsWgcxKURobCINxa1UP2w", // MIL PUTAS ANOLA
        "UCX4he3CGIr4IoCH74hs_QHQ", // MIL PUTAS ANOLA 2
        "UCiMuc3hL8SX1lnjeGa6xdUA", //mil putas mora
        "UC4FDfG0svLWr8UTygKkQROA", // indio mauri
        "UCJjl62B_-CD5GjEtrHBxKUA", // maya
        "UC3zJpFt60eeRDkdOqy3KEkQ", // MANUELA72
        "UCK6wIQRDuAzeUs_8vS07OIQ", // EMILSE
        "UCbylwOYa1kFfNeos7JOf5nQ", // INDIO GUSANO
        "UCBIre3tdX3Se-fmnzI23nDg", // jen 1
        "UCKajy1eaKJUw1vzpX_9452A", // lorna
        "UCMcwTQrLBq2NuhB9zQeD19w", // india manuela
        "UCcNrEm1UFcsVEfwOU7EY40Q", // jen 2
        "UCBmtccczh1hwI0i5vJN_LlA", // LIGE
        "UCa8f35K9tg4fOd4GT2WP3Xg", // krishna
        "UCd7dk1mATeIKbYSkxMf45kw", // JOSE VAZQUES
        "UCjrm1ZD6Il5cr0G4oYc7UMQ", // ROMI FLOR
        "UCZeVURjSotPIBceRC7V-s8g", // DE LA MIL PUTAS TONI KASS
        "UCHAaTBpnDSvjuvpqxr_RStg", // INDIO DE MIL PUTAS CRIS-7
        "UCicMVPurEMSqa6x5Hl_XdvA", // INDIO DE MIL PUTAS MOROCHO
        "UCjq1HzoMiBL8GlHYK8pMwzQ", // QUEEN
        "UCRe4Q2ysLU7GXzKaT3ggSjA", // DANNII INDIO
        "UCvF2JQvx0OIOZNK-VXe01HA", // M INDIA
        "UCWGJfJw6JYzDJzTA6W54QWg", // I INDIA
        "UCQ5qAXoJARiZRKtsmzRLokA", // INDIA CLEO
        "UC9UPQ6RHtFZlq-ebU2l7_0A", // INDIO MAXIMO
        "UCzdo-OD06LR-r8VmqUg3BFA", // RONALD POCOACA
        "UCXwa98DkprbI2K1NMbbUJ5w", // INDIA KAREM XXX
        "UC_CRHkQY0LXdcAeabMv4Z4g", // Natalia Aquino
        "UCaPg7130hLsUrWTeSHfAfzA", // PUTILLA LUZ 13
        "UCUMDeSO4H0-LsL__JR9qujQ", // LILI 1
        "UCLq3dSyKhlpQ8TXn0MZKbgg", // LILI 2
        "UC6W4mI1zzCJ2iaZfP04mSMw", // INDIO ANGEL SERA DE LA MIL PUTAS?
        "UCEg-cFulH2PhBJtacGNwbRg", // PUTA ROSE 100
        "UCRSvSWtEVPKdMERtmmQVqsQ", // INDIO MANOLO DE BOSSA
        "UC3SeHEiHWaKF3QoIQRz6x9A", // INDIO CREADA POR MIL PUTAS 1
        "UCEsnpcl4gaXVPnl3zvbOaZg", // INDIO CREADA POR MIL PUTAS 2
        "UCCIxz3HUoPCRcahgI-LTFjw", // FLAVIA SUAREZ
        "UCf2Xfq8Dqy2JBcDC_vhoH9Q", // SOFIA 80S
        "UC991nWBJ1q3ExleBtzElQgg", // ROS GUTIERRES BOLIVIANA AMIGA DE MIL PUTAS
        "UCEqJln8Yx0rMOv2di0tPB6Q", // uwu isa
        "UC9eMhjHSbAfzcrJIQcgD35g", // indio hans de isa
        "UCDtlMvO_QnQCDhTf4dJMLjg", // isa puta vampira
        "UCLRf62U3V5dsNVuR0cMz9OA", // jesus de isa puta
        "UCOfuKXEa7MNwisbWg66LuKg", // noha de isa puta
        "UCQ6lszpfl2wwfey4bdw7IxQ", // memori codeo de isa puta
        "UCVRKc9Pcie_BnsPB3oZwcKw", // pepe churro indio de puta isa
        "UCjGw0YxhH8IzCHGqs2ym6Nw", // kitti cat de puta isa
        "UCFXQaOKSsSuTfFGfGRC9n4A", // pumuki chido de puta isa
        "UC9E0Qu9QhOQKPGURGJnNulw", // Jim3 (la 100)
        "UClPSX6zsTm_AX634xYFrKEA", // CArmen ochoa
        "UCD8A1GtRgkMTgXEHnmhISqg", // sofi sweet
        "UCtN0UARP60z5WNePkYcgHGA", // yoana g
        "UCHGLvsUrym0gTTEnerO-6Kw", // karem mio
        "UC8FnmZjIX4M_fUP86gXhRxw", // ROSSI india mauri
        //"UCLwmgyj4yr7Eh0JfQQjKK6g", //marcio
    ];

    var cuentas_puta = [];
    for (let j = 0; j < puta_ids.length; j++) {
        // guardara como: https://www.youtube.com/channel/UCbeSWjbTtmEP2kwuT0Sh6pA
        cuentas_puta[j] = canal_puta_ini + puta_ids[j];
    }

    // AHORA EXTRAEREMOS EL ID DE LA IMAGEN DE CADA CUENTA DE MIL PUTAS
    // EJEMPLO DE UN ID DEL CANAL DE UNA CUENTA DE YT
    // https://yt3.ggpht.com/xCMWdDwMXQjU3nEVfGDwKPtwGriYZ7UFY8xHzMgr5ibw-p6nssazuP6i-NNPH2Y7HpC1yShv3Q=s176-c-k-c0x00ffffff-no-rj

    var ima_cuenta_ini = "https://yt3.ggpht.com/";
    // var ima_cuenta_fin="=s176-c-k-c0x00ffffff-no-rj"
    var ima_cuenta_fin = "="; // optamos por este separador "="

    //--------------------------------------------
    // para capturar el nombre de la cuenta
    var nombre_cuenta_ini = `{"channelId":"`;
    var nombre_cuenta_fin = `","title":"`;
    var nombre_cuenta_fin2 = `","`;
    //--------------------------------------------

    var responseStringi = "";
    var directos_ii = "";
    var aux_existe1 = -1;
    var aux_existe2 = -1;
    var aux_existe_nombre = -1;
    var array_id_img_cuenta = [];
    var array_id_img_cuenta_nombre = [];
    var r = -1;
    for (let j = 0; j < cuentas_puta.length; j++) {
        var link_ii = cuentas_puta[j]; // esta devuelta como string

        directos_ii = await request(link_ii);
        responseStringi = directos_ii.toString(); // convertimos a string por seguridad

        //++++++++++++++++++++++++++++++++++++++++++++
        //var archivotxt = "archivillo.txt";
        //fs.writeFileSync(archivotxt, responseStringi);
        //++++++++++++++++++++++++++++++++++++++++++++

        aux_existe1 = responseStringi.indexOf(ima_cuenta_ini);
        if (aux_existe1 != -1) {
            let aux_split = responseStringi.split(ima_cuenta_ini);
            aux_existe2 = responseStringi.indexOf(ima_cuenta_fin);
            if (aux_existe2 != -1) {
                let aux_id_img_cuenta1 = aux_split[1].split(ima_cuenta_fin);
                let aux_id_img_cuenta2 = aux_id_img_cuenta1[0].split(ima_cuenta_fin);
                let id_img_cuenta = aux_id_img_cuenta2[0];
                r = r + 1;
                array_id_img_cuenta[r] = id_img_cuenta;
                //-------para el nombre de la cuenta--------
                // {"channelId":"UCCyezB3yAjtexgicVam6bVg","title":"
                let aux_separador_nombre = nombre_cuenta_ini + puta_ids[j] + nombre_cuenta_fin;

                aux_existe_nombre = responseStringi.indexOf(aux_separador_nombre);
                if (aux_existe_nombre != -1) {
                    let array_split_nombre1 = responseStringi.split(aux_separador_nombre);
                    let array_split_nombre2 = array_split_nombre1[1].split(nombre_cuenta_fin2);
                    let nombre_cuenta = array_split_nombre2[0];
                    array_id_img_cuenta_nombre[r] = id_img_cuenta + "/*/" + nombre_cuenta;
                } else {
                    array_id_img_cuenta_nombre[r] = id_img_cuenta + "/nombreNoEncontrado";
                }
                //------------------------------------------
            }
        }
    }

    // ------- Para verificación -------
    console.log("los id imagen");
    console.log(array_id_img_cuenta);
    // ------- Para verificación -------
    console.log("los id imagen y nombre cuenta");
    console.log(array_id_img_cuenta_nombre);

    //-----------------------------------------------------------
    // para completar la url de los videos en directo de los canales (ojo aun no son los chats en vivo, son solo los canales)
    // ojo que se lo manejo asi de separado, porque puede cambiar por cambios en youtube
    var link_comple_canal_ini = "https://www.youtube.com/channel/";
    var link_comple_canal_ini_esp = "https://www.youtube.com/"; // especial para aquellos que no tienen codigo alfanumerico, sino solo nombres
    var link_comple_canal_fin = "/videos?view=2&live_view=501";

    // solo los id de los canales. AUMENTAR O DISMINUIRLOS, SEGUN NECESIDAD
    // "c/cafemusicbgmchannel", // BGMC JAZZ tiene directos pero no habilitados para chat, REVISAR!
    var idCanales = [
        //"user/DjScenester",

        //"c/MusicLabWork", // para pruebas

        
        "UC_GGWVDrDwGAunoFRiWbHDw", // soul relajante
        "UCS4kVH1srJ9h9nqJPG2iDLg", // sat-chit musica y mantras
        "c/MellowDream", // relajante (ford comander)
        "UCy-jpxAHSt4wz_eruVuz_4A", // RELAX TIME (relajante ruso)
        "UCMNiaUs8-Lb5TzwhjLcswAw", // 4K Scenic Relaxation (relajante ruso)
        "UCsHOUGUpmJo73KONPz3DTkQ", // Lucid Dreaming Music (relajante)

        "UCC0XEDBRtOO2GPC_DP4hR3w", // Beautiful Melody (relajante)
        "c/SoothingRelaxation", // Soothing Relaxation (relajante)
        "c/MusicaRelajanteBeautifulDreams", // Musica Relajante - Beautiful Dreams
        "UC_G6q3LhFZznIrVHL6oK8bA", // Healing Melody (relajante)
        "UC4L-dSrzbPoZcr1Av5GvwKw", // Open Heart Music - Helios 4K (relajante)
        "UC9w8My3S7h-bQZ-4R-0ZPsw", // Helios Music (relajante)
        "c/timjanis", // Tim Janis (relajante)
        "UCfAqGlaQDI4uNrezkuuVYIQ", // Soothing Meditation Music
        "c/AlexdelosReyesmusicTHR", // Healing Your Spirit

        "user/muljanic", // Relax Your Mind
        "UCRZnWilWTPU50kZxlGaC_nQ", // Coffee Music TBM
        "c/OddEagleProductions", // Odd Eagle

        "UCv4KQtNQ3bS5jPCOa6F9LBw", // Music Heals the Soul
        "UC_18SY0IqUBsVX3vyjoT8BQ", // Healing Your Spirit

        "UCTiXaqByXkH-h97DLlLkx1Q", //Queen Club
        "user/dav0delik", //XDeep Club
        "UCJW3ePyqjsvKfHGsz7eetQA", // wonder deep
        "c/TheGoodLiferadio", // The Good Life Radio x Sensual Musique
        "UC2Y1w-M6jxiezn-_IEPfwFA", //Muzik Express LATINAS
        "UCWal9QzIup8uxqWbI30JVyA", // Music Hits Ever
        "UCIDO7u5X7sXXyqVU_KA4GwQ", // Romanticas Música
        "UC6g_Yf3YTagd95_DYFX6Yrw", // Music Hits All Time BOD MARLEY
        "c/MagicSpider", // Wonder EDM
        "c/Gentleman1", // gentleman

        "UCmZzJBHL3kC1z2PwsJOxFxA", // QT Relax Music

        "UCvNogbKXdmFScYgEgLNU_4g", // larissa
        "UCpxY5zDygRzDIP5bTtTI5rA", // italo disco
        "UCxBAtJ0GmD6mhPlidFttkNA", // disco hits
        "UCLo_UlgP6CF8sgAjkDM3gJw", // disco music
        "UC-ITe1nKavRL6-Sl2aE3LKA", // music hits
        "UCnrM0k6ORcRDod2ytUZ4b7g", // Golden Disco Dance

        "UC3PTdlO_kKsClMt8hQ3w0PQ", // musica intemporal (LATINA)
        "UCZWyDlLgsZxwYn_HeGDpptg", // BACHATA MELODIA, (LATINA)
        "UCKBnLtJy1Z82hyGWBJkWbsw", // MUSICA BACHATA (LATINA)
        "UC-yOf9S1O_UG67nTe7ifrJQ", // BACHATA MIX (LATINA)
        "UCHEiLo-jHpipaO7lYX4DnTQ", // MELODIA MUSICAL (LATINA)

        
        "c/BaladasRomanticasÉxitos", // Baladas Romanticas Éxitos (LATINA)
        "UC7bX_RrH3zbdp5V4j5umGgw", // relax music (jazz paris)
        "UCeGJ6v6KQt0s88hGKMfybuw", // Cozy Jazz Music

        "c/PMBMusic", // PMB MUSIC (cristo rio bossa nova)
        "c/musicbrokers", // music brokers
        "c/PlaylistsKool", // bossa arena cafe playa
        "c/ILoveYouVenice", // venecia vivo
        "c/Teleportcamera", // Teleport.camera
        "c/JackFrancisComposer", // OCB Relax Music
        "user/YourRelaxMusic1", // Música Relajante, de Meditación, Música para Dormir
        "c/CassioToledo", // CASSIO TOLEDO (CALMAR)
        "UCeba3pJpMflswMBIANH1u7w", // Best Slow Rock (MAYA)

        "c/JAZZBLUES37999", // JAZZ Y BLUES

        "c/PianoMusica", // PIANO MUSICA
        
        
    ];

    //-----------------------------------------------------------

    var sitios = [];
    for (let i = 0; i < idCanales.length; i++) {
        if (idCanales[i].indexOf("/") != -1) {
            // ejemplo lo llenara como: https://www.youtube.com/c/CassioToledo/videos?view=2&live_view=501
            sitios[i] = link_comple_canal_ini_esp + idCanales[i] + link_comple_canal_fin;
        } else {
            // ejemplo lo llenara como: https://www.youtube.com/channel/UCwVQIkAtyZzQSA-OY1rsGig/videos?view=2&live_view=501
            sitios[i] = link_comple_canal_ini + idCanales[i] + link_comple_canal_fin;
        }
    }

    var n_sitios = sitios.length;
    var n_directos = 0;
    var directos_live = []; // estara vacio, para luego ser llenado
    var j = -1;
    for (let i = 0; i < n_sitios; i++) {
        var link_i = sitios[i]; // esta devuelta como string
        var directos_i = await request(link_i);
        var responseString = directos_i.toString();

        /*
        //++++++++++++++++++++++++++++++++++++++++++++
        var archivotxt = "html_canal_" + i + ".txt";
        fs.writeFileSync(archivotxt, responseString);
        //++++++++++++++++++++++++++++++++++++++++++++
        */

        var en_vivo_a = responseString.indexOf("En directo ahora");
        var en_vivo_b = responseString.indexOf("En vivo ahora");

        // SOLO SERAN TOMADOS EN CUENTA LOS CANALES CON EMISIONES EN DIRECTO
        if (en_vivo_a != -1 || en_vivo_b != -1) {
            var posicion = responseString.indexOf(`"url":"/watch?v=`);
            var posicion_fin_comi = 0;
            var id_directo = "";
            //var posicion = responseString.indexOf("removedVideoId");
            while (posicion != -1) {
                n_directos++;
                posicion_fin_comi = responseString.indexOf(`"`, posicion + 16);
                longitud = posicion_fin_comi - posicion + 16;
                id_directo = responseString.substring(posicion + 16, posicion_fin_comi);
                j = j + 1;
                // uniendo el id del chat directo a la url completa para ser vista en el navegador
                directos_live[j] = "https://www.youtube.com/live_chat?is_popout=1&v=" + id_directo;
                posicion = responseString.indexOf(`"url":"/watch?v=`, posicion + 1);
            }
        }else{
            console.log("===================================")
            console.log("EL CANAL SIN DIRECTOS EN VIVO ES:")
            console.log(link_i)
            console.log("===================================")
        }
    }

    // ------- Para verificación -------
    console.log("el numero de CHATS EN DIRECTO es");
    console.log(n_directos);

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // BUSCAMOS EL ID IMAGEN EN CADA UNO DE LOS DIRECTOS LIVE CHATS

    // buscamos en cada uno de los directos
    var chat_putas_ahora = []; // chats donde la puta esta comentando ahora mismo
    if (directos_live.length > 0) {
        var browser = await puppeteer.launch({ headless: "chrome" });

        var page = await browser.newPage();

        var p = -1;
        for (let k = 0; k < directos_live.length; k++) {
            try {
                // ------- Para verificación -------
                //////console.log("ANALIZANDO DIRECTO: " + (k + 1) + " de " + n_directos);

                //---------------------------------------

                //var browser = await puppeteer.launch({ headless: false });

                //var page = await browser.newPage();

                await page.goto(directos_live[k]); // ira abriendo el link en la misma pestaña abierta anteriormente con "var page = await browser.newPage();" (NO ABRIRA NUEVAS PESAÑAS) ASI SE ACELERA EL TIEMPO DE CARRIDA DEL PROGRAMA

                // PARA ESPERAR 5 SEGUNDOS
                //await page.waitForNetworkIdle({idleTime:5000})

                //await page.screenshot({ path: "perrita1.jpg", fullPage: true });

                await page.waitForSelector("#author-name"); // para que espere hasta que aparesca ese selector

                var srcimg = await page.$$eval(".yt-img-shadow", (alllosses) =>
                    alllosses.map((val) => val.getAttribute("src"))
                ); // "srcimg" DEVUELVE UN ARRAY DONDE ESTAN LOS LINK DE IMAGNES DE LOS CHATEROS en UN CHAT LIVE ESPECIFICO

                // ------- Para verificación -------
                //console.log("LOS SRCIMG ES:");
                //console.log(srcimg);

                if (srcimg.length != null || srcimg.length != 0) {
                    // para no considerar chat donde no existan cometarios
                    for (let t = 0; t < srcimg.length; t++) {
                        if (srcimg[t] != null) {
                            // buscamos en ese chat directo si esta presente cualquiera de las cuentas de mil putas
                            for (let r = 0; r < array_id_img_cuenta.length; r++) {
                                var posicion_puta = srcimg[t]
                                    .toString()
                                    .indexOf(array_id_img_cuenta[r]);
                                if (posicion_puta != -1) {
                                    //-----------------para el nombre de la cuenta------
                                    // id_img_cuenta/nombre_cuenta
                                    let array_id_img_nombre =
                                        array_id_img_cuenta_nombre[r].split("/*/");
                                    let nombre_cuenta_ok = array_id_img_nombre[1];
                                    //--------------------------------------------------
                                    p = p + 1;
                                    chat_putas_ahora[p] =
                                        directos_live[k] + "  " + nombre_cuenta_ok;

                                    console.log(
                                        "AQUI ESTA UNA DE LAS MIL PUTAS: " +
                                            nombre_cuenta_ok +
                                            " " +
                                            (k + 1) +
                                            " de " +
                                            n_directos
                                    );
                                    console.log(directos_live[k]);
                                }
                            }
                        }
                    }
                }

                //await browser.close();

                //---------------------------------------
            } catch (error) {
                console.log(
                    "EL ERROR SURGIO AL ANALIZAR EL CHAT: " + (k + 1) + " de " + n_directos
                );
                console.log(directos_live[k]);
                console.log("DETALLE DEL ERROR:");
                console.error(error);
                console.log("vamos con la siguiente BUSQUEDA..." + (k + 2) + " de " + n_directos);
            }
        }

        await browser.close();
    }

    console.log("LOS CHAT DONDE ANDA MIL PUTAS");
    console.log(chat_putas_ahora);
    console.log("TERMINADO PERRA");
})();
