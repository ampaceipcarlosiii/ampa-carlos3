---
title: Activities
permalink: /en/activities/
alt_lang_url: /es/extraescolares/
---

This is the list of extracurricular activities organised by the AMPA this
school year. Click on each one to see schedule, price and how to sign up.

Prices are shown for AMPA members and non-members. Activities marked as
pending will only run if the minimum number of sign-ups is reached.

<!-- LISTADO: las actividades se generan solas a partir de las fichas -->
{% assign todas = site.actividades | where_exp: "a", "a.relative_path contains '/en/'" | sort: "title" %}

<h2>Infantil</h2>
<ul class="inicio-destacados">
  {% for actividad in todas %}{% if actividad.etapas contains "infantil" %}
  <li>
    <a href="{{ actividad.url | relative_url }}">{{ actividad.title }}</a>
    {% if actividad.etiquetas contains "nuevo" %}<span class="etiqueta">New</span>{% endif %}
    {% if actividad.etiquetas contains "minimo" %}<span class="etiqueta etiqueta-aviso">Minimum sign-ups needed</span>{% endif %}
    {% if actividad.horario %}<p>{{ actividad.horario }}</p>{% endif %}
    {% if actividad.precio %}<p class="precio">{{ actividad.precio | replace: " · ", "<br>" }}</p>{% endif %}
  </li>
  {% endif %}{% endfor %}
</ul>

<h2>Primary</h2>
<ul class="inicio-destacados">
  {% for actividad in todas %}{% if actividad.etapas contains "primaria" %}
  <li>
    <a href="{{ actividad.url | relative_url }}">{{ actividad.title }}</a>
    {% if actividad.etiquetas contains "nuevo" %}<span class="etiqueta">New</span>{% endif %}
    {% if actividad.etiquetas contains "minimo" %}<span class="etiqueta etiqueta-aviso">Minimum sign-ups needed</span>{% endif %}
    {% if actividad.horario %}<p>{{ actividad.horario }}</p>{% endif %}
    {% if actividad.precio %}<p class="precio">{{ actividad.precio | replace: " · ", "<br>" }}</p>{% endif %}
  </li>
  {% endif %}{% endfor %}
</ul>

<h2>Adults</h2>
<ul class="inicio-destacados">
  {% for actividad in todas %}{% if actividad.etapas contains "adultos" %}
  <li>
    <a href="{{ actividad.url | relative_url }}">{{ actividad.title }}</a>
    {% if actividad.etiquetas contains "nuevo" %}<span class="etiqueta">New</span>{% endif %}
    {% if actividad.etiquetas contains "minimo" %}<span class="etiqueta etiqueta-aviso">Minimum sign-ups needed</span>{% endif %}
    {% if actividad.horario %}<p>{{ actividad.horario }}</p>{% endif %}
    {% if actividad.precio %}<p class="precio">{{ actividad.precio | replace: " · ", "<br>" }}</p>{% endif %}
  </li>
  {% endif %}{% endfor %}
</ul>
