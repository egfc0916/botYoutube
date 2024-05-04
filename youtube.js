const puppeteer = require('puppeteer');
require("dotenv").config();
const fs = require("fs").promises;
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {

  


  let success = false; // Variable para indicar si la ejecución fue exitosa
  const minTiempo = 60000; // 6 segundos
  const maxTiempo = 180000; // 18 segundos


 // const browser = await puppeteer.launch({ headless:true, args: ['--no-sandbox'] });

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
   // await page.setViewport({ width: 1280, height: 800 });
   // await page.setViewport({ width: 1280, height: 800 });
    //load cookies
    await page.goto("https://accounts.google.com/signin/v2/identifier", {
      waitUntil: "networkidle2",
    });
    await page.screenshot({ path: 'Verificar_11.png' });
    await page.type("#identifierId", "egfcinverisiones@gmail.com");
    await page.click("#identifierNext");
    
    await page.waitForSelector("#password", {
      visible: true,
      hidden: false,
    });
    
    await page.type(
      "#password",
      "Qwert1619"
    );
   
    await sleep(1000);
    await page.click("#passwordNext");
  
    await sleep(10000);
    // Navegar a la página de YouTube y esperar a que la carga sea completa
    await page.setViewport({ width: 1280, height: 800 });
  const navigationPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  await page.setDefaultNavigationTimeout(0); 
  await page.goto('https://www.youtube.com/');
  await navigationPromise;


 // await page.screenshot({ path: 'Verificar_1.png' });
    //await page.goto('https://www.youtube.com/');
    await page.waitForSelector('input#search', { visible: true });


  // Hacer clic en el botón "Accept all"
  
    await page.screenshot({ path: 'Verificar_3.png' });
    await page.type('input#search', 'Análisis Corto en Aviator  Eduardo Fuentes'); // Reemplaza 'Tu búsqueda aquí' con el video que deseas buscar
    await page.click('button#search-icon-legacy');
    //await page.screenshot({ path: 'Verificar_4.png' });
    await new Promise(resolve => setTimeout(resolve, 6000)); // Espera 5000 milisegundos (5 segundos)
     // Esperar a que aparezcan los resultados y hacer clic en el primer video
// Utilizar page.evaluate para encontrar y hacer clic en el enlace con el texto específico
await page.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a.yt-simple-endpoint')).find(a => a.textContent.includes('Análisis Corto en Aviator'));
  if (link) {
    link.click();
  } else {
    console.error('Enlace no encontrado');
  }
});

 // await page.waitForSelector('ytd-video-renderer');
  //const firstVideo = await page.$('ytd-video-renderer');
  //await firstVideo.click();
  // Generar un número aleatorio entre minTiempo y maxTiempo
  const tiempoAleatorio = Math.floor(Math.random() * (maxTiempo - minTiempo + 1)) + minTiempo;
  await new Promise(resolve => setTimeout(resolve, tiempoAleatorio)); // Espera 5000 milisegundos (5 segundos)
  //await page.screenshot({ path: 'Verificar_5.png' });
  //await new Promise(resolve => setTimeout(resolve, 6000)); // Espera 5000 milisegundos (5 segundos)
  await page.screenshot({ path: 'Verificar_6.png' });

  await page.$eval('input#search', input => input.value = '');
  //await page.type('input#search', 'Análisis Corto en Aviator');
  await page.type('input#search', 'Análisis Corto en Aviator  Eduardo Fuentes'); // Reemplaza 'Tu búsqueda aquí' con el video que deseas buscar
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a.yt-simple-endpoint')).find(a => a.textContent.includes('Programa para analizar soportes y Resistencias en Aviator.'));
    if (link) {
      link.click();
    } else {
      console.error('Enlace no encontrado');
    }
  });
  
  //await page.click('button#search-icon-legacy');
 // await page.screenshot({ path: 'Verificar_4.png' });
 // await new Promise(resolve => setTimeout(resolve, 6000)); // Espera 5000 milisegundos (5 segundos)
 const tiempoAleatorio2 = Math.floor(Math.random() * (maxTiempo - minTiempo + 1)) + minTiempo;
  await new Promise(resolve => setTimeout(resolve, tiempoAleatorio2)); // Espera 5000 milisegundos (5 segundos)
  await page.screenshot({ path: 'Verificar_7.png' });

  ////otro video 


  await page.$eval('input#search', input => input.value = '');
  //await page.type('input#search', 'Análisis Corto en Aviator');
  await page.type('input#search', 'Análisis Corto en Aviator  Eduardo Fuentes'); // Reemplaza 'Tu búsqueda aquí' con el video que deseas buscar
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a.yt-simple-endpoint')).find(a => a.textContent.includes('Aviator Soportes y Resistencias con python'));
    if (link) {
      link.click();
    } else {
      console.error('Enlace no encontrado');
    }
  });
  
  //await page.click('button#search-icon-legacy');
 // await page.screenshot({ path: 'Verificar_4.png' });
 // await new Promise(resolve => setTimeout(resolve, 6000)); // Espera 5000 milisegundos (5 segundos)
 const tiempoAleatorio3 = Math.floor(Math.random() * (maxTiempo - minTiempo + 1)) + minTiempo;
  await new Promise(resolve => setTimeout(resolve, tiempoAleatorio3)); // Espera 5000 milisegundos (5 segundos)
  await page.screenshot({ path: 'Verificar_8.png' });
    
  } catch (error) {
    console.error('Ocurrió un error durante el proceso:', error);
  } finally {
    // Cerrar el navegador al finalizar
    await browser.close();
  }
})();
module.exports = { scrapeYoutube };