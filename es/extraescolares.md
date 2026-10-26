---
title: Extraescolares
permalink: /es/extraescolares/
alt_lang_url: /en/activities/
---

Esta es la oferta de actividades extraescolares organizadas por el AMPA
para este curso. Pulsad en cada una para ver horario, precio y forma de
inscripción.

Los precios se indican para socios y no socios del AMPA. Las actividades
marcadas como pendientes solo se realizarán si se alcanza el mínimo de
inscritos.

<!-- LISTADO: las actividades se generan solas a partir de las fichas -->
{% assign todas = site.actividades | where_exp: "a", "a.relative_path contains '/es/'" | sort: "title" %}

<h2>Infantil</h2>
<ul class="inicio-destacados">
  {% for actividad in todas %}{% if actividad.etapas contains "infantil" %}
  <li>
    <a href="{{ actividad.url | relative_url }}">{{ actividad.title }}</a>
    {% if actividad.etiquetas contains "nuevo" %}<span class="etiqueta">Nueva</span>{% endif %}
    {% if actividad.etiquetas contains "minimo" %}<span class="etiqueta etiqueta-aviso">Pendiente de mínimo de inscritos</span>{% endif %}
    {% if actividad.horario %}<p>{{ actividad.horario }}</p>{% endif %}
    {% if actividad.precio %}<p class="precio">{{ actividad.precio | replace: " · ", "<br>" }}</p>{% endif %}
  </li>
  {% endif %}{% endfor %}
</ul>

<h2>Primaria</h2>
<ul class="inicio-destacados">
  {% for actividad in todas %}{% if actividad.etapas contains "primaria" %}
  <li>
    <a href="{{ actividad.url | relative_url }}">{{ actividad.title }}</a>
    {% if actividad.etiquetas contains "nuevo" %}<span class="etiqueta">Nueva</span>{% endif %}
    {% if actividad.etiquetas contains "minimo" %}<span class="etiqueta etiqueta-aviso">Pendiente de mínimo de inscritos</span>{% endif %}
    {% if actividad.horario %}<p>{{ actividad.horario }}</p>{% endif %}
    {% if actividad.precio %}<p class="precio">{{ actividad.precio | replace: " · ", "<br>" }}</p>{% endif %}
  </li>
  {% endif %}{% endfor %}
</ul>

<h2>Adultos</h2>
<ul class="inicio-destacados">
  {% for actividad in todas %}{% if actividad.etapas contains "adultos" %}
  <li>
    <a href="{{ actividad.url | relative_url }}">{{ actividad.title }}</a>
    {% if actividad.etiquetas contains "nuevo" %}<span class="etiqueta">Nueva</span>{% endif %}
    {% if actividad.etiquetas contains "minimo" %}<span class="etiqueta etiqueta-aviso">Pendiente de mínimo de inscritos</span>{% endif %}
    {% if actividad.horario %}<p>{{ actividad.horario }}</p>{% endif %}
    {% if actividad.precio %}<p class="precio">{{ actividad.precio | replace: " · ", "<br>" }}</p>{% endif %}
  </li>
  {% endif %}{% endfor %}
</ul>
