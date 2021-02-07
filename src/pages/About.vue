<template>
  <article class="about m-4">
    <p>Expenses record keeper without a back-end (<i>yet</i>, more on that later)
    &mdash; <strong>easy to use, easy to erase</strong>.</p>

    <p>It's hard keeping record on what you spend money, and if you're a bit
    paranoid with your phone and apps, it continues to be hard. We're writing
    this simple application to keep a record and easily dispose the information
    &mdash; <b>or not!</b> We're also writing a cloud storage for the information,
    but that comes later.</p>

    <p>The <b>first phase</b> of the project consists of a
    <abbr title="Progressive Web Application">PWA</abbr> using
    <a href="https://vuejs.org">Vue</a> and browsers' IndexedDB through
    <a href="https://dexie.org">Dexie.js</a>.</p>

    <p>The <b>second phase</b> will be a service parse your data and generate
    a spreadsheet file where you can better visualize and analize your finances.
    </p>
  </article>
</template>
