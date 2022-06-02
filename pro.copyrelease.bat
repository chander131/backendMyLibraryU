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

xcopy %current%\config %t%\config /E
xcopy %current%\controllers %t%\controllers /E
xcopy %current%\db %t%\db /E
xcopy %current%\helpers %t%\helpers /E
xcopy %current%\middlewares %t%\middlewares /E
xcopy %current%\models %t%\models /E
xcopy %current%\public %t%\public /E
xcopy %current%\routes %t%\routes /E
xcopy %current%\services %t%\services /E
copy %current%\app.js %t%

@REM xcopy %current%\constants %t%\constants /E
@REM xcopy %current%\controllers %t%\controllers /E
@REM xcopy %current%\db %t%\db /E
@REM xcopy %current%\middlewares %t%\middlewares /E
@REM xcopy %current%\models %t%\models /E
@REM xcopy %current%\routes %t%\routes /E
@REM xcopy %current%\utils %t%\utils /E
@REM copy %current%\app.js %t%
