# Web del AMPA Carlos III (Aranjuez)

Web bilingüe (español / inglés) del AMPA del CEIP Carlos III de Aranjuez,
publicada con GitHub Pages (Jekyll).

> **Estado actual:** versión de borrador en revisión. No sale en Google
> (lleva `noindex` y `robots.txt` bloquea la indexación) y el panel de
> edición `/admin` está desactivado (línea `- admin` en `exclude:` de
> `_config.yml`). Mientras tanto, los cambios se hacen editando archivos
> en GitHub (ver más abajo).

---

## Uso diario: el panel /admin (cuando esté activado)

1. Entra en `https://vuestro-sitio/admin/` (la misma dirección de la web,
   añadiendo `/admin/` al final).
2. Pulsa "Login with GitHub" e inicia sesión con tu cuenta de GitHub.
3. Verás un menú con: **Noticias**, **Extraescolares**, **Páginas del
   sitio** y **Junta Directiva**.
4. Para una noticia o actividad nueva: pulsa "New Noticia" (o
   "Actividad"), verás dos pestañas, **Español** y **English** — rellena
   los dos (título y texto; las actividades también llevan horario y
   precio). Pulsa **"Publish"**. Ya está: en 1-2 minutos aparece en la
   web, en los dos idiomas, sin que tengas que enlazar nada a mano.
5. Para cambiar un texto de una página fija (Hazte socio, Contacto,
   FAQ...): entra en "Páginas del sitio", elige la página, edita el
   texto con el editor (como un Word sencillo: negrita, enlaces,
   listas...) y pulsa "Publish".
6. Para cambiar la Junta Directiva: entra en "Junta Directiva", añade,
   edita o borra personas con el botón "+" / el icono de papelera, y
   publica.
7. Para subir una foto: dentro de cualquier campo de texto hay un botón
   de imagen que abre el selector de archivos de tu ordenador.

No hace falta sabe programar ni entender qué es Markdown, YAML o Jekyll.
Si rellenas los campos en español e inglés, la web entera queda
actualizada en los dos idiomas automáticamente.

---

## Estructura del proyecto (referencia técnica)

- `_noticias/es/` y `_noticias/en/` — noticias, incluyendo una de
  ejemplo. El panel las crea con el mismo nombre de archivo en los dos
  idiomas; por eso el enlace de "cambiar idioma" se calcula solo.
- `_actividades/es/` y `_actividades/en/` — extraescolares, igual.
- `es/` y `en/` — páginas fijas del sitio (inicio, quiénes somos, hazte socio, extraescolares, deportes, noticias, documentos, preguntas frecuentes, contacto, política de cookies).
- `_data/junta.yml` — Junta Directiva.
- `admin/` — el panel de administración (Decap CMS) y su configuración (desactivado por ahora).
- `assets/docs/` — PDF descargables; `assets/img/carteles/` y `assets/img/noticias/` — carteles e imágenes.
- `_layouts/`, `_includes/`, `_config.yml` — plantillas y "fontanería" de
  la web. El idioma de cada página se detecta solo, según si el archivo
  vive dentro de una carpeta `es/` o `en/` — no hay que rellenar ningún
  campo de idioma a mano en ningún sitio.

### Editar directamente en GitHub (alternativa técnica, sin el panel)

Si alguna vez hace falta tocar algo que el panel no cubre, se puede
seguir editando cualquier archivo desde el icono del lápiz (✏️) en
GitHub. Cada noticia/actividad es un archivo con un encabezado así:

```
---
title: "Título"
date: 2026-10-15        # (solo noticias)
etapas: ["primaria"]    # (solo actividades) infantil, primaria y/o adultos
etiquetas: ["nuevo"]    # (opcional) nuevo y/o minimo
horario: "..."          # (solo actividades)
precio: "..."           # (solo actividades, opcional)
lugar: "..."            # (solo actividades, opcional)
imparte: "..."          # (solo actividades, opcional)
carteles:               # (solo actividades, opcional)
  - imagen: /assets/img/carteles/mi-cartel.jpg
    descripcion: "Texto que describe la imagen"
imagen: /assets/img/noticias/x.jpg      # (solo noticias, opcional) cartel de la noticia
imagen_descripcion: "Describe la imagen" # (solo noticias, con imagen)
---

Texto en Markdown normal.
```

Recuerda crear el archivo **con el mismo nombre** en `es/` y en `en/`
dentro de la carpeta correspondiente (`_noticias` o `_actividades`), para
que el selector de idioma enlace correctamente entre las dos versiones.

### Trabajar en local (opcional)

```
gem install bundler
bundle install
bundle exec jekyll serve
```

Abre `http://localhost:4000/es/` en el navegador.

> Nota técnica: este proyecto se construyó en un entorno sin acceso a
> `rubygems.org`, así que no ha podido compilarse localmente durante su
> creación. La sintaxis de las plantillas se ha validado con un motor
> Liquid equivalente en Python. Conviene revisar visualmente el sitio
> tras el primer despliegue en GitHub Pages.

---

## Pendientes antes de la versión definitiva

- [ ] Quitar el `noindex` de `_layouts/default.html` y cambiar
      `Disallow: /` por `Allow: /` en `robots.txt`.
- [ ] Activar el panel de edición: quitar `- admin` de `exclude:` en
      `_config.yml` y configurar `admin/config.yml` (repositorio y
      "puente" de login con GitHub).
- [ ] Subir los PDF pendientes (estatutos, acta, memoria) a
      `assets/docs/` y activar sus enlaces en `es/documentos.md` y
      `en/documents.md`; descomentar `show_estatutos_link` en
      `es/quienes-somos.md` y `en/about-us.md`.
- [ ] Completar las fechas y enlaces de inscripción en "Deportes" y los
      enlaces QR del cartel de Halloween.
- [ ] Revisar el texto de la política de cookies con quien lleve la
      protección de datos del AMPA.
- [ ] Revisar y, si procede, borrar la noticia de bienvenida de ejemplo.

**Enlaces internos:** en las páginas `.md` los enlaces a archivos del
sitio se escriben con `{{ '/ruta' | relative_url }}`, para que funcionen
con el `baseurl` del repositorio (`/ampa-carlos3`).
