# Web del AMPA Carlos III (Aranjuez)

Esta web se actualiza desde un **panel de administración con formularios**,
sin tocar código ni archivos. Este documento tiene dos partes:

1. **Para quien actualice el contenido día a día** — solo necesita leer
   la sección "Uso diario: el panel /admin".
2. **Para quien haga la puesta en marcha** (una sola vez) — el resto del
   documento.

---

## Uso diario: el panel /admin

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

## Puesta en marcha (una sola vez)

Esta parte sí requiere pasos técnicos puntuales. Idealmente la hace la
misma persona que suba el proyecto a GitHub la primera vez; después nadie
más tiene que volver a tocar esto.

### 1. Crear el repositorio en GitHub y activar GitHub Pages

1. Sube este proyecto a un repositorio nuevo en tu cuenta/organización de
   GitHub.
2. En el repositorio, ve a **Settings → Pages**, elige "Deploy from a
   branch", rama `main`, carpeta `/ (root)`, guarda.
3. Copia la URL pública que te da GitHub (tipo
   `https://tu-usuario.github.io/nombre-repo/`).
4. Abre `_config.yml` y rellena `url` y `baseurl` con esos datos (hay
   comentarios "EDITABLE" dentro del archivo que lo explican).

### 2. Dar acceso de login a GitHub (el "puente" de autenticación)

El panel `/admin` necesita que las personas inicien sesión con su cuenta
de GitHub para poder publicar cambios. Para eso hace falta un pequeño
"puente" gratuito (no es más que una dirección web que GitHub usa para
confirmar el login). Se monta una sola vez:

**a) Crear una "aplicación OAuth" en GitHub**

1. Ve a `github.com/settings/applications/new`.
2. **Application name**: `AMPA Carlos III - Admin` (o lo que prefieras).
3. **Homepage URL**: la URL de tu "puente" (ver paso siguiente; si aún no
   la tienes, pon la URL de la propia web por ahora y la cambias después).
4. **Authorization callback URL**: la misma URL del puente + `/callback`
   (ej. `https://ampa-carlos3-oauth.tu-usuario.workers.dev/callback`).
5. Guarda y copia el **Client ID** y el **Client Secret** que te da
   GitHub (el secret solo se ve una vez: cópialo ya).

**b) Desplegar el puente (gratuito, en Cloudflare Workers)**

Usamos el proyecto de código abierto
[`decap-proxy`](https://github.com/sterlingwes/decap-proxy). Necesitas una
cuenta gratuita en [Cloudflare](https://dash.cloudflare.com/sign-up) (sin
tarjeta de crédito).

Si quieres que lo haga yo por ti, dame estos 3 datos (puedes pegarlos
directamente en el chat, o decírmelos de forma seminbrada si prefieres):
- tu **Client ID** y **Client Secret** de GitHub (paso "a"),
- un **API Token de Cloudflare** con permiso de "Edit Workers"
  (se genera en `dash.cloudflare.com/profile/api-tokens` → "Create Token"
  → plantilla "Edit Cloudflare Workers").

Y lo despliego por ti desde aquí. Si prefieres hacerlo tú mismo:

```bash
git clone https://github.com/sterlingwes/decap-proxy
cd decap-proxy
cp wrangler.toml.sample wrangler.toml
# edita wrangler.toml: pon un "name" para el worker

npx wrangler login
npx wrangler secret put GITHUB_OAUTH_ID       # pega aquí el Client ID
npx wrangler secret put GITHUB_OAUTH_SECRET   # pega aquí el Client Secret
npx wrangler deploy
```

Al terminar, Wrangler te da una URL como
`https://decap-proxy.tu-usuario.workers.dev`. Esa es tu "puente".

**c) Conectar todo**

1. Si la "Homepage URL" de la aplicación OAuth (paso a.3) era provisional,
   vuelve a `github.com/settings/developers`, edítala y pon la URL real
   del puente.
2. Abre `admin/config.yml` en este proyecto y rellena las dos líneas
   marcadas `EDITABLE`:
   ```yaml
   repo: tu-usuario/nombre-del-repo
   base_url: https://decap-proxy.tu-usuario.workers.dev
   ```
3. Sube ese cambio a GitHub (commit).
4. Entra en `https://tu-sitio/admin/` y prueba a iniciar sesión.

A partir de aquí, nadie más tiene que volver a tocar esta sección: la
persona que mantenga el contenido solo usa el panel, como se explica
arriba.

---

## Estructura del proyecto (referencia técnica)

- `_noticias/es/` y `_noticias/en/` — noticias, incluyendo una de
  ejemplo. El panel las crea con el mismo nombre de archivo en los dos
  idiomas; por eso el enlace de "cambiar idioma" se calcula solo.
- `_actividades/es/` y `_actividades/en/` — extraescolares, igual.
- `es/` y `en/` — páginas fijas del sitio.
- `_data/junta.yml` — Junta Directiva.
- `admin/` — el panel de administración (Decap CMS) y su configuración.
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

## Pendientes antes de publicar

- [ ] Completar la puesta en marcha (secciones 1 y 2 de arriba).
- [ ] Sustituir el correo de ejemplo `ampacarlosiiiaranjuez@gmail.com`
      por el real en `_includes/footer.html`, `es/contacto.md` y
      `en/contact.md`.
- [ ] Rellenar la Junta Directiva real desde el panel (o `_data/junta.yml`).
- [ ] Rellenar la cuota real en "Hazte socio" desde el panel.
- [ ] Subir los PDF reales (estatutos, inscripción, actas) y enlazarlos
      desde "Documentos".
- [ ] Añadir el logo del colegio en `assets/img/` cuando esté disponible.
- [ ] Revisar y sustituir la noticia/actividad de ejemplo.

**Nota sobre `baseurl`**: los enlaces a los PDF en "Documentos" y "Hazte
socio" están escritos como rutas simples (`/assets/docs/...`) a propósito,
para que se puedan editar desde el panel sin riesgo de romper código. Si
publicáis la web con un `baseurl` distinto de vacío (caso de una "project
page" de GitHub, tipo `tu-usuario.github.io/nombre-repo/`), esos enlaces
necesitarán el prefijo del repo delante a mano. Si publicáis con un
dominio propio o como `tu-usuario.github.io` (sin carpeta), no hay que
tocar nada.
