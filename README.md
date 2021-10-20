Expenses record keeper without a back-end -- **easy to use, easy to erase**.

* Icons bundled with [svgeez]

It's hard keeping record on what you spend money, and if you're a bit
paranoid with your phone and apps, it continues to be hard. We're writing
this simple application to keep a record and easily dispose the information.

<abbr title="Progressive Web Application">PWA</abbr> using [Vue](https://vuejs.org)
and browsers IndexedDB through [Dexie.js](https://dexie.org).

## Images and Icons

* [House image] by [Stanley Donwood], ripped from the In Rainbows (by Radiohead) album artwork
* [Cassette doodle], [CC0 1.0]
* [Archives icon] by [Yaroslav Samoylov]
([archive](https://web.archive.org/web/20210123183012/https://thenounproject.com/goldenroof/)),
[CC BY-SA 3.0]
* [About icon] by [Yaroslav Samoylov]
([archive](https://web.archive.org/web/20210123183012/https://thenounproject.com/goldenroof/)),
[CC BY-SA 3.0]

SVG icons are found in [public/icons](public/icons), bundled together by running
`svgeez build --source public/icons --destination public/icons.svg` then I copy the contents
of the output file (`icons.svg`) and paste them in [index.html](index.html).

[svgeez]: https://github.com/jgarber623/svgeez
[House image]: https://www.radiohead.com/library/#ir
[Stanley Donwood]: https://www.slowlydownward.com/
[Cassette doodle]: https://svgsilh.com/ms/3f51b5/image/1431397.html
[Archives icon]: https://commons.wikimedia.org/w/index.php?curid=67855499
[About icon]: https://commons.wikimedia.org/wiki/File:About_icon_(The_Noun_Project).svg
[Yaroslav Samoylov]: https://thenounproject.com/goldenroof/
[CC0 1.0]: https://creativecommons.org/licenses/cc0/1.0/?ref=ccsearch&atype=html
[CC BY-SA 3.0]: https://creativecommons.org/licenses/by-sa/3.0
