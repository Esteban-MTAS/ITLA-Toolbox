# Instalar ITLA Toolbox en Android

La aplicación requiere **Android 7.0 (API 24) o superior** y conexión a Internet para consultar las API.

## Desde el teléfono

1. Descargar `ITLA-Toolbox.apk` desde la publicación real del repositorio: https://github.com/Esteban-MTAS/ITLA-Toolbox/releases
2. Abrir el archivo descargado.
3. Si Android lo solicita, permitir que la aplicación usada para abrir el archivo (navegador o gestor de archivos) instale aplicaciones de esta fuente.
4. Pulsar **Instalar** y abrir **ITLA Toolbox**.

La versión `release` incluye JavaScript y recursos locales: no necesita Metro ni conexión con el ordenador. Las consultas de datos sí requieren Internet. Si no hay conexión, se muestran errores recuperables y botones para reintentar.

## Desde un ordenador con ADB

Activar las opciones de desarrollador y la depuración USB, conectar el teléfono y aceptar su diálogo de autorización:

```powershell
adb devices
adb install -r ITLA-Toolbox.apk
adb shell am start -n com.itlatoolbox/.MainActivity
```

El APK de depuración `app-debug.apk` sirve para desarrollo con Metro. Para instalar y presentar el proyecto de forma autónoma, usar `ITLA-Toolbox.apk`, copiado desde la variante release.

## Firma y actualizaciones

La versión académica utiliza la clave de depuración estándar de React Native. No es una firma de producción para Play Store. Para actualizar una instalación existente, el APK debe conservar el mismo identificador (`com.itlatoolbox`) y firma. Si Android detecta una firma distinta, no permite actualizarla directamente.

## Comprobación para la presentación

Abrir los siete módulos desde Inicio, buscar un nombre, generar otra persona, buscar universidades, actualizar el clima, buscar Pikachu y reproducir su sonido, abrir una noticia y regresar a la app. Confirmar que la fotografía real aparece tanto en el icono como en el perfil antes de entregar al profesor.
