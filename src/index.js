const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const request = require("request-promise");

const rutas = require("./rutas/rutas");

const cuentas_canales = require("./cuentas_canales");

// puerto a usar
app.set("puerto", 3000);

// ventanas html
app.set("views", path.join(__dirname, "ventanas"));

//----------------------------------------------
// iniciando el servidor
app.listen(app.get("puerto"), async () => {
    //--------------------------------------------------------
    // LIMPIESA DE LOS ALAMCENADORES JSON
    var array_limpio = [];
    var string_limpio = JSON.stringify(array_limpio);
    fs.writeFileSync("src/contador.json", string_limpio, "utf-8");
    fs.writeFileSync("src/errores.json", string_limpio, "utf-8");
    fs.writeFileSync("src/ubicada.json", string_limpio, "utf-8");
    //--------------------------------------------------------

    var erroresjson = fs.readFileSync("src/errores.json", "utf-8");
    var errores_json = JSON.parse(erroresjson);
    // ------- Para verificación -------
    console.log("EL ERORRRR");
    console.log(errores_json);

    var ubicadajson = fs.readFileSync("src/ubicada.json", "utf-8");
    var ubicada_json = JSON.parse(ubicadajson);
    // ------- Para verificación -------
    console.log("EL UBICADO");
    console.log(ubicada_json);

    var contadorjson = fs.readFileSync("src/contador.json", "utf-8");
    var contador_json = JSON.parse(contadorjson);
    // ------- Para verificación -------
    console.log("EL CONTADOR");
    console.log(contador_json);

    var contador = 0; // contador de chats revisados
    var num_corridas = 100;
    var array_contador = [];
    var array_servidor = [];

    for (let cc = 0; cc < num_corridas; cc++) {
        try {
            console.log("SERVIDOR ESCUCHANDO EN EL PUERTO 3000");

            // agregar mas ids si es posible
            // SON LAS CUENTAS DE PUTAS QUE BUSCAR Y ENCONTRAR EN LOS CHATS DIRECTOS DE YT

            var canal_puta_ini = "https://www.youtube.com/channel/";
            // agregar o quitar este ARRAY segun necesidad
            // "UCbeSWjbTtmEP2kwuT0Sh6pA", // en id canal de marcio

            //===============================================
            var puta_ids = cuentas_canales.cuentas;
            //===============================================

            var cuentas_puta = [];
            for (let j = 0; j < puta_ids.length; j++) {
                // guardara como: https://www.youtube.com/channel/UCbeSWjbTtmEP2kwuT0Sh6pA
                cuentas_puta[j] = canal_puta_ini + puta_ids[j];
            }

            //--------------------------------------------
            // para capturar el nombre de la cuenta
            var nombre_cuenta_ini = `{"channelId":"`;
            var nombre_cuenta_fin = `","title":"`;
            var nombre_cuenta_fin2 = `","`;
            //--------------------------------------------

            var responseStringi = "";
            var directos_ii = "";
            var aux_existe_nombre = -1;
            var array_id_cuenta_nombre = [];
            var r = -1;
            for (let j = 0; j < cuentas_puta.length; j++) {
                var link_ii = cuentas_puta[j]; // esta devuelta como string

                directos_ii = await request(link_ii);
                responseStringi = directos_ii.toString(); // convertimos a string por seguridad

                //++++++++++++++++++++++++++++++++++++++++++++
                //var archivotxt = "archivillo.txt";
                //fs.writeFileSync(archivotxt, responseStringi);
                //++++++++++++++++++++++++++++++++++++++++++++

                //-------para el nombre de la cuenta--------
                // {"channelId":"UCCyezB3yAjtexgicVam6bVg","title":"
                let aux_separador_nombre = nombre_cuenta_ini + puta_ids[j] + nombre_cuenta_fin;

                aux_existe_nombre = responseStringi.indexOf(aux_separador_nombre);
                r = r + 1;
                if (aux_existe_nombre != -1) {
                    let array_split_nombre1 = responseStringi.split(aux_separador_nombre);
                    let array_split_nombre2 = array_split_nombre1[1].split(nombre_cuenta_fin2);
                    let nombre_cuenta = array_split_nombre2[0];
                    array_id_cuenta_nombre[r] = puta_ids[j] + "/*/" + nombre_cuenta;
                } else {
                    array_id_cuenta_nombre[r] = puta_ids[j] + "/nombreNoEncontrado";
                }
            }

            // ------- Para verificación -------
            console.log("los id y nombre cuenta mil putas");
            console.log(array_id_cuenta_nombre);

            //-----------------------------------------------------------
            // para completar la url de los videos en directo de los canales (ojo aun no son los chats en vivo, son solo los canales)
            // ojo que se lo manejo asi de separado, porque puede cambiar por cambios en youtube
            var link_comple_canal_ini = "https://www.youtube.com/channel/";
            var link_comple_canal_ini_esp = "https://www.youtube.com/"; // especial para aquellos que no tienen codigo alfanumerico, sino solo nombres
            var link_comple_canal_fin = "/videos?view=2&live_view=501";

            // solo los id de los canales. AUMENTAR O DISMINUIRLOS, SEGUN NECESIDAD
            // "c/cafemusicbgmchannel", // BGMC JAZZ tiene directos pero no habilitados para chat, REVISAR!

            //=========================================
            var idCanales = cuentas_canales.canales;
            //=========================================

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

            const browser = await chromium.launch({ channel: "msedge" }); // FUNCIONA
            const page = await browser.newPage();

            var n_sitios = sitios.length;

            var chat_putas_ahora = []; // chats donde la puta esta comentando ahora mismo
            var p = -1; // ira agregando a la encontrada en el array: chat_putas_ahora

            for (let i = 0; i < n_sitios; i++) {
                var directos_live = []; // sera llenado con los chats directos de este canal "i"
                var j = -1;
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
                var en_vivo_c = responseString.indexOf("Live now");

                // SOLO SERAN TOMADOS EN CUENTA LOS CANALES CON EMISIONES EN DIRECTO
                if (en_vivo_a != -1 || en_vivo_b != -1 || en_vivo_c != -1) {
                    var posicion = responseString.indexOf(`"url":"/watch?v=`);
                    var posicion_fin_comi = 0;
                    var id_directo = "";
                    //var posicion = responseString.indexOf("removedVideoId");
                    while (posicion != -1) {
                        posicion_fin_comi = responseString.indexOf(`"`, posicion + 16);
                        longitud = posicion_fin_comi - posicion + 16;
                        id_directo = responseString.substring(posicion + 16, posicion_fin_comi);
                        j = j + 1;
                        // uniendo el id del chat directo a la url completa para ser vista en el navegador
                        directos_live[j] =
                            "https://www.youtube.com/live_chat?is_popout=1&v=" + id_directo;
                        posicion = responseString.indexOf(`"url":"/watch?v=`, posicion + 1);
                    }
                } else {
                    console.log("===================================");
                    console.log("EL CANAL SIN DIRECTOS EN VIVO ES:");
                    console.log(link_i);
                    console.log("===================================");
                }

                // ====================================================================
                // UNA VEZ QUES SE CUENTA CO LOS LIVES DIRECTOS DE ESTE CANAL, PROCEDEMOS A BUSCAR SI AQUI SE ENCUENTRA MIL PUTAS

                if (directos_live.length > 0) {
                    for (let k = 0; k < directos_live.length; k++) {
                        try {
                            //================================================
                            // contador de buscador a los chats
                            contador = contador + 1;
                            var info =
                                "CORRIDA #: " +
                                (cc + 1) +
                                " de " +
                                num_corridas +
                                " chat revisado #: " +
                                contador;
                            array_contador[0] = info.toString();
                            var string_contador = JSON.stringify(array_contador);
                            fs.writeFileSync("src/contador.json", string_contador, "utf-8");

                            console.log(info);
                            
                            //================================================
                            await page.waitForTimeout(3000); // para esperar el cargado de la pagina
                            await page.goto(directos_live[k], {
                                waitUntil: "load",
                                timeout: 0, // para que no tenga limites en esperar el cargado de la pagina
                            }); // ira abriendo el link en la misma pestaña abierta anteriormente con "var page = await browser.newPage();" (NO ABRIRA NUEVAS PESAÑAS) ASI SE ACELERA EL TIEMPO DE CARRIDA DEL PROGRAMA
                            //await page.waitForTimeout(3000); // para esperar el cargado de la pagina
                            await page.waitForSelector("#author-name"); // para que espere hasta que aparesca ese selector

                            var contenido_body = await page.evaluate(() => {
                                var texto = document.querySelector("body").innerHTML;
                                return texto;
                            });
                            var body_string = contenido_body.toString();

                            // buscamos en ese chat directo si esta presente cualquiera de las cuentas de mil putas
                            for (let r = 0; r < puta_ids.length; r++) {
                                var posicion_puta = body_string.indexOf(puta_ids[r]);

                                if (posicion_puta != -1) {
                                    //-----------------para el nombre de la cuenta------
                                    // id_img_cuenta/nombre_cuenta
                                    let array_id_img_nombre =
                                        array_id_cuenta_nombre[r].split("/*/");
                                    let nombre_cuenta_ok = array_id_img_nombre[1];
                                    //--------------------------------------------------
                                    p = p + 1;
                                    chat_putas_ahora[p] =
                                        directos_live[k] + "  " + nombre_cuenta_ok;

                                    console.log(
                                        "AQUI ESTA UNA DE LAS MIL PUTAS: " +
                                            nombre_cuenta_ok +
                                            " CANAL " +
                                            (i + 1) +
                                            " de " +
                                            n_sitios
                                    );
                                    console.log(directos_live[k]);

                                    var informe =
                                        nombre_cuenta_ok +
                                        " " +
                                        directos_live[k] +
                                        " " +
                                        new Date() +
                                        " corr " +
                                        (cc + 1) +
                                        " de " +
                                        num_corridas;

                                    //--------------------------------------------------
                                    // lo agregamos a la base de datos JSON ACTUALIZANDOLO CONTANTEMENTE, asi no tendremos que esperar que revise TODOS los chats para cuando una vez que termine recien nos muestre los resultados

                                    // leemos lo que actualmente esta escrito en el json
                                    var json_inicial = fs.readFileSync("src/ubicada.json", "utf-8"); // json_inicial ESTARA EN STRING
                                    var estados = JSON.parse(json_inicial); // estados ESTARA CONVERTIDO EN JSON

                                    // Agregamos el nuevo avistamiento de la mil putas
                                    estados.push(informe);

                                    // aqui guardamos agregando en el json lo que encontro
                                    // lo que hace es que si el archivo no existe lo crea y escribe los datos sobre el y si el archivo existe, entonces lo que hace es escribir sobre el nuevamente.
                                    var json_actualizado = JSON.stringify(estados);
                                    fs.writeFileSync("src/ubicada.json", json_actualizado, "utf-8");
                                    await page.waitForTimeout(3000); // para esperar el cargado de la pagina
                                }
                            }

                            //await browser.close();

                            //---------------------------------------
                        } catch (error) {
                            console.log("EL ERROR SURGIO AL ANALIZAR EL CHAT:");

                            console.log(directos_live[k]);
                            console.log(
                                "CANAL " + (i + 1) + " de " + n_sitios + " DETALLE DEL ERROR:"
                            );
                            console.error(error);
                            await page.waitForTimeout(3000); // para esperar el cargado de la pagina
                            console.log("vamos con la siguiente BUSQUEDA...");

                            var info_err_a =
                                "Error " +
                                directos_live[k] +
                                " CORRIDA " +
                                (cc + 1) +
                                " de " +
                                num_corridas +
                                " INFORME: " +
                                error;

                            array_servidor[0] = info_err_a.toString();
                            var json_actualizado_err_a = JSON.stringify(array_servidor);
                            fs.writeFileSync("src/errores.json", json_actualizado_err_a, "utf-8");
                        }
                    }
                }

                // ====================================================================
            }

            await browser.close();

            console.log("LOS CHAT DONDE ANDA MIL PUTAS");
            console.log(chat_putas_ahora);
            console.log("TERMINADO CORRIDA NUMERO " + (cc + 1) + " de " + num_corridas);
        } catch (error) {
            // ------- Para verificación -------
            console.log(
                "ERRO SURGIDO EN LA CORRIDA " + (cc + 1) + " de " + num_corridas + " informe:"
            );
            console.log(error);

            var info_err_b =
                "Error CORRIDA " + (cc + 1) + " de " + num_corridas + " INFORME: " + error;

            array_servidor[0] = info_err_b.toString();
            var json_actualizado_err_b = JSON.stringify(array_servidor);
            fs.writeFileSync("src/errores.json", json_actualizado_err_b, "utf-8");
        }

        var corrida = "CORRIDA NUMERO " + (cc + 1) + " de " + num_corridas;

        array_servidor[0] = corrida.toString();
        var estado_corrida_f = JSON.stringify(array_servidor);
        fs.writeFileSync("src/errores.json", estado_corrida_f, "utf-8");
    }
});

//rutas
app.use(rutas);
