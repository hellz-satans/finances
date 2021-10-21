<template>
  <article class="about m-4">
    <h1 class="text-3xl">My Finances</h1>

    <p>Expenses record keeper without a back-end &mdash;
    <strong>easy to use, easy to erase</strong>.</p>

    <ul>
      <li>
        Web app written with <a href="https://v3.vuejs.org" rel="nofollow">Vue</a>
      </li>
      <li>Data stored in browsers' IndexedDB through
        <a href="https://dexie.org" rel="nofollow">Dexie.js</a>
      </li>
      <li>
        Icons bundled with
        <a href="https://github.com/jgarber623/svgeez">svgeez</a>
      </li>
    </ul>

    <p>It's hard keeping record on what you spend money, and if you're a bit
    paranoid with your phone and apps, it continues to be hard. We're writing
    this simple application to keep a record and easily dispose the information.
    </p>

    <p>PWA using <a href="https://vuejs.org" rel="nofollow">Vue</a>
    and browsers IndexedDB through
    <a href="https://dexie.org" rel="nofollow">Dexie.js</a>.
    </p>

    <h2>Images and Icons</h2>

    <ul>
      <li><a href="https://www.radiohead.com/library/#ir" rel="nofollow">House image</a> by <a href="https://www.slowlydownward.com/" rel="nofollow">Stanley Donwood</a>, ripped from the In Rainbows (by Radiohead) album artwork</li>
      <li><a href="https://svgsilh.com/ms/3f51b5/image/1431397.html" rel="nofollow">Cassette doodle</a> by <a href="https://pixabay.com/users/elionas-2345468/">Elionas</a> &mdash; thanks!, <a href="https://creativecommons.org/licenses/cc0/1.0/?ref=ccsearch&amp;atype=html" rel="nofollow">CC0 1.0</a></li>
      <li><a href="https://commons.wikimedia.org/w/index.php?curid=67855499" rel="nofollow">Archives icon</a> by <a href="https://thenounproject.com/goldenroof/" rel="nofollow">Yaroslav Samoylov</a>
        (<a href="https://web.archive.org/web/20210123183012/https://thenounproject.com/goldenroof/" rel="nofollow">archive</a>),
        <a href="https://creativecommons.org/licenses/by-sa/3.0" rel="nofollow">CC BY-SA 3.0</a></li>
      <li><a href="https://commons.wikimedia.org/wiki/File:About_icon_(The_Noun_Project).svg" rel="nofollow">About icon</a> by <a href="https://thenounproject.com/goldenroof/" rel="nofollow">Yaroslav Samoylov</a>
        (<a href="https://web.archive.org/web/20210123183012/https://thenounproject.com/goldenroof/" rel="nofollow">archive</a>),
        <a href="https://creativecommons.org/licenses/by-sa/3.0" rel="nofollow">CC BY-SA 3.0</a></li>
    </ul>

    <p>SVG icons are found in
    <a href="https://github.com/hellz-satans/finances/blob/master/public/icons">public/icons</a>,
    bundled together by running
    <code>svgeez build --source public/icons --destination public/icons.svg</code>
    then I copy the contents of the output file (<code>public/icons.svg</code>) to
    <code>index.html</code>.
    </p>
  </article>
</template>

<style lang="scss">
.about {
  h1 { margin-bottom: 1rem; }
  h2 { margin-bottom: 0.875rem; }

  p { margin-bottom: 0.75rem; }
  ul {
    margin-bottom: 0.75rem;
    padding-left: 1rem;

    li {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
