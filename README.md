# ITLA Toolbox — Herramientas Inteligentes

Aplicación Android académica de **Esteban Josué Mata Acosta**, matrícula **20241860**, Instituto Tecnológico de las Américas (ITLA).

Ocho pantallas en español, navegación nativa, diseño azul marino y tarjetas claras. Consume API reales; los datos de prueba existen únicamente dentro de las pruebas automatizadas.

## Funcionalidades

1. Dashboard con ilustración original de caja de herramientas y siete accesos.
2. Estimación estadística de género con probabilidad y resultado neutral cuando falta información.
3. Persona aleatoria: fotografía, nombre, apellido, nacimiento y edad.
4. Universidades por país en inglés, lista virtualizada y enlaces externos.
5. Clima de Santo Domingo: temperatura, sensación, humedad, viento, máximas, mínimas y probabilidad de lluvia.
6. Pokémon: imagen, experiencia, habilidades y reproducción nativa de `cries.latest`.
7. Las tres publicaciones más recientes de WordPress News y logo oficial.
8. Perfil profesional con contactos configurables y sin datos personales inventados.

## Tecnología

React Native CLI 0.88.1 (sin Expo), React 19.3, TypeScript estricto, React Navigation Native Stack, Axios, Zod para validar respuestas, Feather, react-native-sound y Gradle. Las versiones exactas resueltas están en `package-lock.json`; usar `npm ci` para reproducirlas.

## Arquitectura

```text
android/                Proyecto nativo, iconos y Gradle Wrapper
assets/images/          Ilustración y fotografía personal opcional
src/navigation/         Rutas tipadas y Native Stack
src/screens/            Las ocho vistas
src/components/         Página, tarjetas, búsqueda, botones y estados
src/services/           Peticiones HTTP separadas por API
src/types/              Esquemas de validación y tipos inferidos
src/hooks/              Solicitudes cancelables y ciclo de vida del audio
src/theme/              Colores y estilos compartidos
src/constants/          Perfil editable
src/utils/              Fechas, códigos meteorológicos, HTML y enlaces
__tests__/              Servicios, errores, navegación y hooks
scripts/                Verificación real de API y generación del icono
docs/                   Evidencia y lista de entrega
```

## Instalación y ejecución

Requisitos: Node >=22.11, npm, Android Studio, JDK 21 (se utilizó el JBR de Android Studio), Android SDK con plataforma 37, Build Tools 37 y NDK 27.1.12297006. Android mínimo: API 24.

```powershell
npm ci
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
$env:ANDROID_HOME="$env:LOCALAPPDATA\Android\Sdk"
npm start
# En otra terminal con un emulador o teléfono conectado:
npm run android
```

Android Studio puede abrir directamente la carpeta `android`. `android/local.properties` es local, no se publica; usar `sdk.dir=C:/ruta/al/Android/Sdk` si Gradle no encuentra el SDK.

## Verificación

```powershell
npm run typecheck
npm run lint
npm test
npm run api:check
```

Las pruebas Jest usan respuestas controladas para cubrir casos deterministas. El script `api:check` llama a los servicios reales y guarda únicamente metadatos de verificación en `docs/API_CHECKS.json`. Las API pueden limitar consultas o no estar disponibles.

## Compilación

```powershell
cd android
.\gradlew.bat assembleDebug assembleRelease
```

- Desarrollo: `android/app/build/outputs/apk/debug/app-debug.apk`, requiere Metro.
- Instalación autónoma: `android/app/build/outputs/apk/release/app-release.apk`, incluye JavaScript y recursos.
- La variante release académica usa la clave de depuración estándar de React Native. No es una firma privada de producción ni una entrega para Play Store. Para distribución comercial, configurar una clave propia fuera de Git y proteger sus contraseñas mediante variables o propiedades locales.

## API

| Función | Fuente |
| --- | --- |
| Género | https://api.genderize.io/?name=irma |
| Personas | https://randomuser.me/api/?results=1&inc=name,dob,picture |
| Universidades | https://adamix.net/proxy.php?country=Dominican%20Republic |
| Clima | https://api.open-meteo.com/v1/forecast |
| Pokémon | https://pokeapi.co/api/v2/pokemon/pikachu |
| Noticias | https://wordpress.org/news/wp-json/wp/v2/posts?per_page=3&_embed&orderby=date&order=desc |

El clima utiliza `America/Santo_Domingo`. Las fechas de noticias se interpretan desde UTC. Los sonidos de PokéAPI son Ogg, reproducidos por MediaPlayer en Android a través de react-native-sound. Se liberan al cambiar de Pokémon, salir de la pantalla o pasar la aplicación a segundo plano.

## Fotografía y contactos

No se suministró fotografía. El icono neutral es provisional y **no satisface el requisito académico del icono fotográfico**.

1. Añadir la fotografía real a `assets/images/profile.jpg`.
2. Ejecutar `npm run profile:icon` para generar todas las densidades y el icono adaptativo, y activar la foto en el perfil.
3. Editar `src/constants/profile.ts` para agregar correo, teléfono y perfiles reales.
4. Reconstruir el APK y actualizar la publicación y el PDF de entrega.

La fotografía original se excluye de Git por defecto. Si se publica código que la importa, debe incluirse conscientemente el recurso o sustituirse por un recurso accesible: `git add -f assets/images/profile.jpg` solo cuando se quiera publicar la fotografía.

## Entrega académica

Consultar `docs/ENTREGA.md`, `docs/VERIFICACION.md`, `docs/FORO_WORDPRESS.md` y `progress.md` para el estado real. El texto del foro está preparado, no publicado. El PDF final requiere la fotografía real y enlaces públicos comprobados; la plantilla se identifica explícitamente como pendiente.

## Publicar desde otro equipo

```powershell
git init -b main
git add .
git commit -m "Implement ITLA Toolbox Android application"
gh repo create ITLA-Toolbox --public --source=. --remote=origin --push
gh release create v1.0.0 android/app/build/outputs/apk/release/app-release.apk --title "ITLA Toolbox 1.0" --notes "Entrega académica; revisar pendientes en docs/ENTREGA.md"
```

No ejecutar la creación si el repositorio ya existe; usar el remoto real registrado en Git. No guardar credenciales ni claves privadas en el repositorio.
