# API WordPress para el foro del ITLA

- Sitio: **WordPress News**, noticias oficiales de WordPress.
- Página principal: https://wordpress.org/news/
- API exacta: https://wordpress.org/news/wp-json/wp/v2/posts?per_page=3&_embed&orderby=date&order=desc
- Logo oficial: https://s.w.org/style/images/about/WordPress-logotype-wmark.png
- Verificación inicial: HTTP 200 el 28 de octubre de 2026; la publicación más reciente era del mismo día.
- Uso: consultar las tres entradas publicadas más recientemente, ordenadas por fecha descendente. Mostrar titular, extracto convertido a texto, fecha y enlace original. No se almacena contenido ficticio.
- Alternativa probada y descartada: WordPress.com REST v1.1 devolvió HTTP 403. WP Tavern respondió, pero sus últimas publicaciones eran antiguas.

## Texto listo para copiar

Para mi proyecto **ITLA Toolbox**, utilizaré la API REST pública de **WordPress News** (https://wordpress.org/news/):

https://wordpress.org/news/wp-json/wp/v2/posts?per_page=3&_embed&orderby=date&order=desc

La aplicación consultará las tres publicaciones más recientes y mostrará el logo del sitio, los titulares, sus resúmenes y fechas, junto con un botón para visitar cada artículo original. Los campos HTML se convertirán a texto legible. Esta API no requiere una clave para leer las publicaciones públicas.

**Esteban Josué Mata Acosta - Matrícula 20241860.**

## Estado

Texto preparado. **No se ha publicado en el foro.** El estudiante debe publicarlo desde su cuenta académica.

## Sustituir la fuente

Editar `NEWS` en `src/services/wordpressService.ts`: nombre, página principal, API y logo. La fuente debe exponer la estructura WordPress REST v2 con `id`, `link`, `date_gmt`, `title.rendered` y `excerpt.rendered`. Confirmar HTTP 200 y publicaciones recientes mediante `npm run api:check`; actualizar también el verificador y este documento. La aplicación muestra un error si la fuente falla.
