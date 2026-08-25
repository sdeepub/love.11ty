---
layout: layouts/base.njk
footerFile: footer.njk
pageClass: posts
templateEngineOverride: njk, md
---
<main>

<time class="date" datetime="{{ date }}">{{ date | dateDisplay }}</time>

{{ content | safe }}
  
  {# The plugin will parse this line ONLY if a video exists on the post #}
  {% if youtube %}
    <p>{{ youtube | safe }}</p>
  {% endif %}
  
<time class="date" datetime="{{ release_date }}">{{ song }} : {{ release_date | dateDisplay("LLLL d, y") }}</time>

</main>

