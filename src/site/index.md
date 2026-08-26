---
title: Love.11TY
subtitle: เรื่องราวระหว่างทาง ของ การเดินทาง และ การกลับบ้าน - คนแปลกหน้า ที่ผ่านมาพบกัน ส่งยิ้มให้ หรือ message ทิ้งไว้ ถ้าว่าง? บางทีก็อาจจะแวะไปหา เขียนจดหมาย ส่งโทรจิต ออกเดินทาง-ค้นหา เจอบ้าง ไม่เจอบ้าง เรียบง่าย ตรงไป-ตรงมา กับความรู้สึก ... เวลานั้น
layout: layouts/base.njk
---
## เรื่องทั้งหมดก็มีอยู่ว่า:

<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay("LLLL d, y") }}</time>
  </li>
{%- endfor -%}
</ul>

