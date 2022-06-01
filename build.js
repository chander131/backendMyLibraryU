/********************************************************
 *     DANIEL ELIAS BAT DE GENERACION DE RELEASE        *
 *                Fecha: 22/09/2021                     *
 *******************************************************/
const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const DIR_ACTUAL = process.cwd();
const DIR_DIST = "dist";
const SO = process.platform;
/**
 * Punto de incio
 */
async function main() {
  console.log("Se inicia el proceso de generación del proyecto.");
  console.log("Leyendo package.json");
  let sPackage = getPackage();
  console.log("Compilando: ", sPackage.name);
  console.log("Versión: ", sPackage.version);
  console.log("Sistema operativo host: ", SO);
  console.log("Validando carpeta dist");
  let fDist = getPathDist();
  console.log("dist: ", fDist);
  console.log("Generando package.json del compilado");
  setPackage(fDist, sPackage);
  console.log("El archivo package.json fue creado correctamente");
  console.log("Creando sub directorios");
  setSubDirectorios(fDist);
  console.log("Sub directorios creados correctamente");
  console.log("Se inicia el proceso de copiado de archivo");
  await setCopiar();
  console.log("Finaliza el proceso de copiado.");
  console.log(
    "Se finaliza el proceso de compilación, la carpeta de salida es: ",
    fDist
  );
}
function getPackage() {
  return JSON.parse(
    fs.readFileSync(path.resolve(DIR_ACTUAL, "package.json"), "utf8")
  );
}
function getPathDist() {
  let sDist = path.resolve(DIR_ACTUAL, DIR_DIST);
  if (fs.existsSync(sDist)) deleteFolderRecursive(sDist);
  fs.mkdirSync(sDist);
  return sDist;
}
var deleteFolderRecursive = function (_path) {
  if (fs.existsSync(_path)) {
    fs.readdirSync(_path).forEach(function (file, index) {
      var curPath = path.resolve(_path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(_path);
  }
};
function setPackage(d, p) {
  let lPackage = {
    name: p.name,
    version: p.version,
    description: p.description,
    main: p.main,
    scripts: {
      start: p.scripts.start,
    },
    keywords: p.keywords,
    author: p.author,
    license: p.license,
    dependencies: p.dependencies,
  };
  fs.writeFileSync(path.resolve(d, "package.json"), JSON.stringify(lPackage));
}
function setSubDirectorios(d) {
  fs.mkdirSync(path.resolve(d, "constants"));
  fs.mkdirSync(path.resolve(d, "controllers"));
  fs.mkdirSync(path.resolve(d, "db"));
  fs.mkdirSync(path.resolve(d, "middlewares"));
  fs.mkdirSync(path.resolve(d, "models"));
  fs.mkdirSync(path.resolve(d, "routes"));
  fs.mkdirSync(path.resolve(d, "utils"));
}
async function setCopiar() {
  if (SO === "win32") {
    const { stdout, stderr } = await exec("pro.copyrelease.bat");
    console.log(stdout);
    if (stderr) console.log("Ocurrió un error en la compilación.");
    return { stdout, stderr };
  } else {
    let msj = "Actualmente este sistema no está soportado.";
    console.log(msj, SO);
    return { stdout: "", stderr: msj };
  }
}
main();
