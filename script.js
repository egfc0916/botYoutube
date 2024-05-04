const puppeteer = require('puppeteer');
require("dotenv").config();

(async () => {
  let success = false; // Variable para indicar si la ejecución fue exitosa

  //const browser = await puppeteer.launch({ headless:true, args: ['--no-sandbox'] });
  //const browser = await puppeteer.launch();

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
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://betplay.com.co/');
    await page.waitForSelector('input[type="text"][id="userName"]', { visible: true });
    await page.type('input[type="password"][id="password"]', 'Qwert1619');
    await page.type('input[type="text"][id="userName"]', '1065623370');
    await page.click('#btnLoginPrimary');
    await page.waitForNavigation();
    await page.goto('https://betplay.com.co/slots/launchGame?gameCode=SPB_aviator&flashClient=true&additionalParam=&integrationChannelCode=PARIPLAY');
    await new Promise(resolve => setTimeout(resolve, 25000)); // Espera 5000 milisegundos (5 segundos)
    await page.waitForSelector('#gameFrame');
    const iframePadre = await page.$('#gameFrame');
    const framePadre = await iframePadre.contentFrame();
    await framePadre.waitForSelector('#spribe-game');
    const iframeInterno = await framePadre.$('#spribe-game');
    const frameInterno = await iframeInterno.contentFrame();

    //presionar el boton automatico
    await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > app-navigation-switcher > div > button:nth-child(3)');
    await frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > app-navigation-switcher > div > button:nth-child(3)');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 5000 milisegundos (5 segundos)
   // await page.screenshot({ path: 'Verificar_1.png' });

   //presione el boton retiro automatico
    await  frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cash-out-switcher > app-ui-switcher > div');
    await  frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cash-out-switcher > app-ui-switcher > div');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
  //  await page.screenshot({ path: 'Verificar_2.png' });

    //Octenemos el saldo del usuario
    await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.main-header > app-header > div > div.second-block.d-flex > div.d-flex.h-100 > div.balance.px-2.d-flex.justify-content-end.align-items-center > div > span.amount.font-weight-bold');
    const elemento = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.main-header > app-header > div > div.second-block.d-flex > div.d-flex.h-100 > div.balance.px-2.d-flex.justify-content-end.align-items-center > div > span.amount.font-weight-bold');
    const texto = await elemento.evaluate(el => el.textContent);
    console.log(texto); // Mostrar el texto en la consola
   // await page.screenshot({ path: 'Verificar_3.png' });

    //ingresamos el valor  de la entrada 
    await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
    
    // Evalúa una función en el contexto del navegador para cambiar el valor del input
    await frameInterno.evaluate(() => {
         const inputElement = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
         inputElement.value = ' '; // Cambia el valor del input a "100"
         inputElement.dispatchEvent(new Event('input')); // Dispara un evento 'input' para que se refleje el cambio
        });
  const ElementInversion = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
   // Simula un clic izquierdo en el botón
//await ElementInversion.click({ button: 'left' });
  // Espera un segundo para que se refleje el cambio (opcional)
  await ElementInversion.type('1000');
    await new Promise(resolve => setTimeout(resolve, 1000));
   // await page.screenshot({ path: 'Verificar_4.png' });
    
    
    /*
    const ElementInversion = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
    await ElementInversion.click({ clickCount: 3 }); // Seleccionar todo el texto y borrar
    await ElementInversion.press('Backspace'); // Oprimir la tecla "Backspace" para borrar
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
    await ElementInversion.type('100');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
    await page.screenshot({ path: 'Verificar_4.png' });
 */

    //agregamos el valor 1.05 de retiro automatico


    await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
    
    await frameInterno.evaluate(() => {
      const inputElementMul = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
      inputElementMul.value = ''; // Cambia el valor del input a "100"
      inputElementMul.dispatchEvent(new Event('input')); // Dispara un evento 'input' para que se refleje el cambio
     });
   
     //await page.screenshot({ path: 'Verificar_5.png' });
    const inputElement = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
    await inputElement.type('1.05');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
   // await page.screenshot({ path: 'Verificar_5.png' });
    //await inputElement.click({ button: 'left' });
    /*await inputElement.click({ clickCount: 3 }); // Seleccionar todo el texto y borrar
    await inputElement.press('Backspace'); // Oprimir la tecla "Backspace" para borrar
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
    await inputElement.type('1.05');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
    await page.screenshot({ path: 'Verificar_5.png' });
    */
    // Verifica que el elemento haya sido encontrado




if (inputElement) {
  // Obtiene el valor del elemento
  const valorElemento = await inputElement.getProperty('value');
  const valorIngresado = await valorElemento.jsonValue();
  // Verifica que el valor sea "1.05"
  if (valorIngresado.trim() === '1.05') {
      console.log('El valor ingresado es 1.05.');  
      await  frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
      await  frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
     // await page.screenshot({ path: 'Verificar_6.png' });
      await new Promise(resolve => setTimeout(resolve, 60000)); // Espera 1000 milisegundos (5 segundos) 
    } else {
      console.log('El valor ingresado no es 1.05.');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 1000 milisegundos (5 segundos) 
      //agregamos el valor 1.05 de retiro automatico
      // await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
       //const inputElement = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
       await inputElement.click({ clickCount: 3 }); // Seleccionar todo el texto y borrar
       await inputElement.press('Backspace'); // Oprimir la tecla "Backspace" para borrar
       await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
       await inputElement.type('1.05');
       await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 se os)

       const valorElemento = await inputElement.getProperty('value');
        const valorIngresado = await valorElemento.jsonValue();
       if (valorIngresado.trim() === '1.05') {
        // Obtiene el valor del elemento
          console.log('El valor 2 ingresado es 1.05.');  
          await  frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
          await  frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
          await page.screenshot({ path: 'Verificar_6.png' });
          await new Promise(resolve => setTimeout(resolve, 60000)); // Espera 1000 milisegundos (5 segundos) 
        
        
      
      }
      else {console.log('El valor ingresado 2 no es 1.05.');}
      }
} else {
  console.log('No se encontró el elemento.');
}  
    
   
    success = true;
  //  await page.screenshot({ path: 'Verificar_7.png' });

  } catch (error) {
    console.error('Ocurrió un error durante el proceso:', error);
  } finally {
    // Cerrar el navegador al finalizar
    await browser.close();
  }
})();
module.exports = { scrapeScript };
