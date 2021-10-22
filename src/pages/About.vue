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

    <p>It's hard keeping record on what you spend money, and if you're a bit paranoid with your
    phone and apps, it continues to be hard. This simple application was written to keep a record
    and easily dispose the information.
    </p>

    <p>Initially I was using <a href="https://budgetbakers.com/">BudgetBakers</a>' app, which is,
    if you haven't used it, <strong>GREAT</strong>.<br>
    Honestly, this privacy-focused, small app doesn't really compete with the quality of
    BudgetBakers; I highly recommend it. But when I got familiar enough and reached the paywall,
    I was offered to continue using the app albeit with limited functionality, and I thought to
    myself: <q>what's the catch?</q>
    </p>

    <p>Then it dawned on me that they could be harvesting data to sell it later or whatever,
    and I don't really know who they are, what their intentions are or what they can and
    <em>could</em> do, really.
    </p>

    <p>So, here we are. I wrote a quick'n'dirty solution at first
    (<a href="https://hellz-satans.github.io/my-finances-pwa/">v1</a>) and I've been tweaking and
    removing stuff over the time, which is what you're reading.
    </p>

    <p>Source code hosted on github
    <a href="https://github.com/hellz-satans/finances/">hellz-satans/finances</a>.
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
  h1 { margin: 1rem 0; }
  h2 { margin: 0.875rem 0; }

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
