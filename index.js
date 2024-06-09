var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
});
server.listen(process.env.PORT);

const CronJob = require('cron').CronJob;
const path = require('path');
const { exec } = require('child_process');

new CronJob('*/20 * * * *', function(){
  // Ruta al script que deseas ejecutar
  const scriptPath = path.join(__dirname, 'autoY.js');
  
  // Ejecuta el script con Node.js
  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Error en la ejecución del script: ${stderr}`);
      return;
    }
    console.log(`Resultado del script: ${stdout}`);
  });
}, null, true, "America/Los_Angeles");
