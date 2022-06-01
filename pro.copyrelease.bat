rem  ********************************************************
rem  *     DANIEL ELIAS BAT DE GENERACION DE RELEASE        *
rem  *                Fecha: 22/09/2021                     *
rem  ********************************************************
echo off
cls
echo Creando variables de entorno
set current=%cd%
set t=%current%\dist
cd %t%
echo Compiando el Compilando

xcopy %current%\constants %t%\constants /E
xcopy %current%\controllers %t%\controllers /E
xcopy %current%\db %t%\db /E
xcopy %current%\middlewares %t%\middlewares /E
xcopy %current%\models %t%\models /E
xcopy %current%\routes %t%\routes /E
xcopy %current%\utils %t%\utils /E
copy %current%\app.js %t%