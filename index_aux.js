//const fs = require("fs");
const { chromium } = require("playwright");
//const { firefox } = require("playwright");
//const request = require("request-promise");

(async () => {
    // const browser = await chromium.launch({ headless:false}); // funciona
    //const browser = await chromium.launch({ headless: true }); // NO funciona
    const browser = await chromium.launch({ channel: "msedge" }); // FUNCIONA
    //const browser = await chromium.launch({ channel: "chrome" }); // NO funciona
    //const browser = await chromium.launch({ headless: "chrome" }); // que pasa que aqui no funciona
    //const browser = await chromium.launch({ headless: true, 'ignoreHTTPSErrors': true});

    // PUEDE USAR ESTOS DOS:
    //const context = await browser.newContext();
    //const page = await context.newPage();

    // O SOLO PUEDE USAR ESTE:
    const page = await browser.newPage();

    /*
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-extensions-except=' + this.extensionPathBuildPath, '--load-extension=' + this.extensionPathBuildPath],});
    */

    //const pato = chromium.name();
    // ------- Para verificación -------
    //console.log("el nombre del navegador es: " + pato);

    

    //console.log("ESPERAMOS 10 seg antes pagina");
    //await page.waitForTimeout(10000); // para esperar el cargado de la pagina

    await page.goto(
        "https://www.youtube.com/live_chat?is_popout=1&v=yRJxz0NicgI",
        {
            waitUntil: "domcontentloaded",
            // Remove the timeout
            //timeout: 0,
        }
    );

    console.log("ESPERAMOS EL SELECTOR");
    await page.waitForSelector("#author-name");

    // ------- Para verificación -------
    //console.log("ESPERAMOS EL CARGADO DE LA PAGINA POR 5 SEGUNDOS");

    //await page.waitForTimeout(5000); // para esperar el cargado de la pagina
    //await page.waitForNetworkIdle({ idleTime: 5000 });

    //await page.screenshot({ path: "perrita.jpg", fullPage: true });

    var cuenta_id = "UCkR6cQGPhxwfSqCq5K9SBeQ";

    try {
        const contenido_main = await page.evaluate(() => {
            const texto = document.querySelector("main");
            return texto;
        });

        // ------- Para verificación -------
        console.log("LA RESPUESTA HTML MAIN");
        console.log(contenido_main);
    } catch (error) {
        // ------- Para verificación -------
        console.log("el puto error de main");
        console.log(error);
    }

    try {
        const contenido_body = await page.evaluate(() => {
            const texto = document.querySelector("body").innerHTML;
            return texto;
        });

        // ------- Para verificación -------
        console.log("LA RESPUESTA HTML BODY");
        console.log(contenido_body);

        //responseStringi = directos_ii.toString(); // convertimos a string por seguridad
        var existe = contenido_body.toString().indexOf(cuenta_id);

        if (existe != -1) {
            // ------- Para verificación -------
            console.log("el OBJETIVO EXISTE");
        } else {
            console.log("el OBJETIVO NOOOOO EXISTE");
        }
    } catch (error) {
        // ------- Para verificación -------
        console.log("el puto error de body");
        console.log(error);
    }

    await browser.close();
    console.log("TERMINADO PERRA");
})();
