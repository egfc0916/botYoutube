const puppeteer = require('puppeteer');

(async() => {
	let success = false; // Variable para indicar si la ejecución fue exitosa
	let ValorActual = 0;
	let ValorAnterior = 0;
	let ValorAnterior2 = 0;
	let ValorAnterior3 = 0;
	let ValorAnterior4 = 0;
	let ValorAnterior5 = 0;
	let ValorAnterior6 = 0;
    let arreglo;
	let entradaInicial='100'
	let SaldoInicial;
	let SaldoFinal;
    let ValorApuesta=0;
    const tiempoEspera = 1000; // 1 segundo
    let inputElement ;
    let inputElementApuesta;
	const browser = await puppeteer.launch({
		executablePath: puppeteer.executablePath(),
		//headless:false,
        args: ['--no-sandbox']
	});
	//const browser = await puppeteer.launch();
	const page = await browser.newPage();
	try {
		await page.setViewport({
			width: 1280,
			height: 800
		});
		await page.goto('https://betplay.com.co/');
		await page.waitForSelector('input[type="text"][id="userName"]', {
            headless:false,
			visible: true
		});
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
		await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cash-out-switcher > app-ui-switcher > div');
		await frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cash-out-switcher > app-ui-switcher > div');
		await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5000 milisegundos (5 segundos)
		//  await page.screenshot({ path: 'Verificar_2.png' });

		//Octenemos el saldo del usuario
		await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.main-header > app-header > div > div.second-block.d-flex > div.d-flex.h-100 > div.balance.px-2.d-flex.justify-content-end.align-items-center > div > span.amount.font-weight-bold');
		const elemento = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.main-header > app-header > div > div.second-block.d-flex > div.d-flex.h-100 > div.balance.px-2.d-flex.justify-content-end.align-items-center > div > span.amount.font-weight-bold');
		const texto = await elemento.evaluate(el => el.textContent);
		SaldoInicial = parseFloat(texto);
		console.log(texto);

/*
		//ingresamos el valor  de la entrada 
		await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');

		// Evalúa una función en el contexto del navegador para cambiar el valor del input
		await frameInterno.evaluate(() => {
			 inputElementApuesta = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
			inputElementApuesta.value = ' '; // Cambia el valor del input a "100"
			inputElementApuesta.dispatchEvent(new Event('input')); // Dispara un evento 'input' para que se refleje el cambio
		});
		const ElementInversion = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
		await ElementInversion.type('100');
		await new Promise(resolve => setTimeout(resolve, 1000));
		
*/
async function ingresarValorDeEntrada(frameInterno, entrada) {
    // Espera a que el selector esté disponible
    await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
  
    // Evalúa una función en el contexto del navegador para cambiar el valor del input
    await frameInterno.evaluate(() => {
      const inputElementApuesta = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
      inputElementApuesta.value = ''; // Cambia el valor del input
      inputElementApuesta.dispatchEvent(new Event('input')); // Dispara un evento 'input' para que se refleje el cambio
    });
  
    // Obtén el elemento y escribe el valor deseado
    const ElementInversion = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
    await ElementInversion.type(entrada);
  
    // Espera un segundo antes de continuar
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Uso de la función en tu código
  await ingresarValorDeEntrada(frameInterno, entradaInicial);
  


      //creamos la funcion para  remplazar lo del 1.05
      const cambiarValorInput105 = async (frame) => {
       // const selector = 'body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input';
        
        // Espera a que el selector esté disponible
       // await frame.waitForSelector(selector);
        await frame.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
      
        // Evalúa una función en el contexto del navegador para cambiar el valor del input
        await frame.evaluate(() => {
          const inputElementMul = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
          inputElementMul.value = ''; // Cambia el valor del input a ""
          inputElementMul.dispatchEvent(new Event('input')); // Dispara un evento 'input' para que se refleje el cambio
        });
      
        // Espera a que el selector esté disponible y captura el elemento
         inputElement = await frame.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.second-row > div.cashout-block > div.cashout-spinner-wrapper > div > app-spinner > div > div.input.full-width > input');
        
        // Escribe '1.05' en el input
        await inputElement.type('2.00');
        
        // Espera un segundo
        await new Promise(resolve => setTimeout(resolve, 1000));
      };
      
      

      /////////////////////////////////
      await cambiarValorInput105(frameInterno);

     




		await frameInterno.waitForSelector('.bubble-multiplier');
		// Selecciona el elemento que deseas observar
		const obtenerYAlmacenarValor = async() => {
			const nuevoValor = await frameInterno.evaluate(() => {
				//const div = document.querySelector('.bubble-multiplier');
				const div = document.querySelector("body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.result-history.disabled-on-game-focused.my-2 > app-stats-widget > div > div.payouts-wrapper > div");
				const val=div.textContent.split(' ')
                
                // return div.textContent.trim().replace("x", "")[0]});
                const arrayLimpio = val.map(elemento => elemento.replace('x\n', ''));

                // Filtrar cualquier elemento vacío que pueda haber quedado
                const arrayFiltrado = arrayLimpio.filter(elemento => elemento !== '');
                
                console.log(arrayFiltrado);
        

				//return parseFloat(div.textContent.trim());
                return arrayFiltrado;

			});

			return nuevoValor;

		};
		/////////////////////////////////////

		// Llamamos a la función y mostramos el valor obtenido
		const obtenerValorYMostrar = async() => {
			arreglo = await obtenerYAlmacenarValor();
            ValorActual    = parseFloat(arreglo[0]);
            ValorAnterior  = parseFloat(arreglo[1]);
			ValorAnterior2  = parseFloat(arreglo[2]);
			
			ValorAnterior3  = parseFloat(arreglo[3]);
			ValorAnterior4  = parseFloat(arreglo[4]);
			ValorAnterior5  = parseFloat(arreglo[5]);
			ValorAnterior6  = parseFloat(arreglo[6]);
           // console.log('Valor Actual=', ValorActual);
			//console.log('Valor Anterior=', ValorAnterior);
			
		};
        // Llamamos a la función y mostramos el valor obtenido
		const OctenerValorApuesta = async() => {
			arreglo = await obtenerYAlmacenarValor();
            ValorApuesta    =parseFloat(arreglo[0]);
            console.log('Valor Apuesta=', ValorApuesta);
			
		};

		// Llamamos a la función para obtener el valor y mostrarlo
		//obtenerValorYMostrar();

		if (inputElement) {
			// Obtiene el valor del elemento
			const valorElemento = await inputElement.getProperty('value');
			const valorIngresado = await valorElemento.jsonValue();
			// Verifica que el valor sea "1.05"
			if (valorIngresado.trim() === '2.00') {
               // obtenerValorYMostrar();
				console.log('El valor ingresado es 2.00.');
                
                
                 /*

				await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
				await frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
			
				await new Promise(resolve => setTimeout(resolve, 60000)); // Espera 1000 milisegundos (5 segundos) 
                */
               OctenerValorApuesta();
               let BtnApostar;
               let textoBtn
               let control= true;
			   let ValorEntrada;
                while (true) {
                   // procesarValores();
                    obtenerValorYMostrar();
                    if (ValorApuesta === ValorActual) {
                    // console.log('valors isn cambiar ')

                    } else{ 
                            
                                                        if (((ValorActual < 2.00 && ValorAnterior > 2.00   && ValorAnterior2 < 2.00 && ValorAnterior3 > 2.00 && ValorAnterior4 > 2.00 )||
														     (ValorActual < 2.00 && ValorAnterior > 2.00   && ValorAnterior2 < 2.00 && ValorAnterior3 > 2.00 && ValorAnterior4 < 2.00 )||

															 (ValorActual > 2.00 && ValorAnterior < 2.00   && ValorAnterior2 > 2.00 && ValorAnterior3 < 2.00 && ValorAnterior4 > 2.00 )||
															 (ValorActual > 2.00 && ValorAnterior < 2.00   && ValorAnterior2 > 2.00 && ValorAnterior3 < 2.00 && ValorAnterior4 < 2.00 )
															)  
															 
															 &&control) {
															ValorEntrada=ValorActual;
                                                            control=false;
                                                            await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
                                                            BtnApostar =  await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
                                                            textoBtn = await BtnApostar.evaluate(el => el.textContent);
                                                           
                                                            
                                                           
                                                                        if(textoBtn.trim() === 'Cancelar'){
                                                                          
                                                                        }
                                                                        else{
                                                                             console.log('Presionar boton #');
                                                                             await frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
                                                                          }
                                                        } 
                                                        if(ValorActual < 2.00 && control==false &&  ValorEntrada!=ValorActual) {
                                                              console.log('Ejecutar otra vez');
															  ValorEntrada=ValorActual;
															  await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
															  await frameInterno.evaluate(() => {
															        const inputElement = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
																   inputElement.value = ' '; // Cambia el valor del input a "100"
																   inputElement.dispatchEvent(new Event('input')); // Dispara un evento 'input' para que se refleje el cambio
																  });
															  const ElementInversion = await frameInterno.$('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.bet-block > app-spinner > div > div.input > input');
															  let con=parseFloat(entradaInicial);
															  let con2=String(con*2);
															  entradaInicial=con2;
															  await ElementInversion.type(entradaInicial);
															  await new Promise(resolve => setTimeout(resolve, 1000));
															  await  frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
															  await  frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
															  console.log('Valor Actual=', ValorActual,'Valor Anteior=',ValorAnterior, 'ValorAnterior2=',ValorAnterior2);
                                                             // break; // Rompe el bucle si se ha ganado la partida
															}
                                                            if(ValorActual > 2.00 && control==false && ValorEntrada!=ValorActual){
																console.log('Valor Actual=', ValorActual,'Valor Anteior=',ValorAnterior, 'ValorAnterior2=',ValorAnterior2);
																break; // Rompe el bucle si se ha ganado la partida
                                                                     
			//console.log('Valor Anterior=', ValorAnterior);
                                                            }
                                                                
                          }
                 
                    // Añadir una pausa para evitar saturar la CPU
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                  }
               

			} else {
				console.log('El valor ingresado no es 1.05.');
                await cambiarValorInput105(frameInterno);
				const valorElemento = await inputElement.getProperty('value');
				const valorIngresado = await valorElemento.jsonValue();
				if (valorIngresado.trim() === '1.05') {
					// Obtiene el valor del elemento
					console.log('El valor  ingresado 2.1 es 1.05.');
                    /*
					await frameInterno.waitForSelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');
					await frameInterno.click('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.bet-controls > app-bet-controls > div > app-bet-control:nth-child(1) > div > div.first-row.auto-game-feature > div.buttons-block > button');

					await new Promise(resolve => setTimeout(resolve, 60000)); // Espera 1000 milisegundos (5 segundos) 

                            */

				} else {
					console.log('El valor ingresado 2 no es 1.05.');
				}
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
		await new Promise(resolve => setTimeout(resolve, 60000)); // Espera 1000 milisegundos (5 segundos) 
		await browser.close();
	}
})();