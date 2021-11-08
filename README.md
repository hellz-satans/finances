Expenses record keeper without a back-end -- **easy to use, easy to erase**.

[Demo] hosted in Github pages. You can use it safely as long as you trust your browser/device.
Don't trust that the page isn't sending your data somewhere? Fork it and upload it to your
own hosting provider.

![Screenshot of webapp with light color scheme](/public/img/screenshot.png)
![Screenshot of webapp with dark color scheme](/public/img/screenshot-dark.png)

* Web app written with [Vue](https://v3.vuejs.org)
* Data stored in browsers' IndexedDB through [Dexie.js](https://dexie.org)
* Icons bundled with [svgeez]

It's hard keeping record on what you spend money, and if you're a bit paranoid with your phone and
apps, it continues to be hard. This simple application was written to keep a record and easily
dispose the information.

Initially I was using [BudgetBakers]' app, which is, if you haven't used it, **GREAT**. Honestly,
this privacy-focused, small app doesn't really compete with the quality of BudgetBakers; I highly
recommend it. But when I got familiar enough and reached the paywall, I was offered to continue
using the app albeit with limited functionality, and I thought to myself: what's the catch?

Then it dawned on me that they could be harvesting data to sell it later or whatever, and I don't
really know who they are, what their intentions are or what they can and _could_ do, really.

So, here we are. I wrote a quick'n'dirty solution at first ([v1]) and I've been tweaking and
removing stuff over time, which is what you're reading.

## Images and Icons

* [House image] by [Stanley Donwood], ripped from the In Rainbows (by Radiohead) album artwork
* [Cassette doodle] by [Elionas] -- thanks!, [CC0 1.0]
* [Archives icon] by [Yaroslav Samoylov]
([archive](https://web.archive.org/web/20210123183012/https://thenounproject.com/goldenroof/)),
[CC BY-SA 3.0]
* [About icon] by [Yaroslav Samoylov]
([archive](https://web.archive.org/web/20210123183012/https://thenounproject.com/goldenroof/)),
[CC BY-SA 3.0]

SVG icons are found in [public/icons](public/icons), bundled together by running
`svgeez build --source public/icons --destination public/icons.svg` then I copy the contents
of the output file (`icons.svg`) to [index.html](index.html).

## Development

This was upgraded from Vue2/webpack to Vue3/vite, the basic scripts are:

* `dev` (`yarn dev`): start development server
* `build` (`yarn build`): transpile assets, ready for deployment
* `serve` (`yarn serve`): start preview server from which the output of `build` is served

[Demo]: https://hellz-satans.github.io/finances/
[BudgetBakers]: https://budgetbakers.com/
[v1]: https://hellz-satans.github.io/my-finances-pwa/
[svgeez]: https://github.com/jgarber623/svgeez
[House image]: https://www.radiohead.com/library/#ir
[Stanley Donwood]: https://www.slowlydownward.com/
[Cassette doodle]: https://svgsilh.com/ms/3f51b5/image/1431397.html
[Elionas]: https://pixabay.com/users/elionas-2345468/
[Archives icon]: https://commons.wikimedia.org/w/index.php?curid=67855499
[About icon]: https://commons.wikimedia.org/wiki/File:About_icon_(The_Noun_Project).svg
[Yaroslav Samoylov]: https://thenounproject.com/goldenroof/
[CC0 1.0]: https://creativecommons.org/licenses/cc0/1.0/?ref=ccsearch&atype=html
[CC BY-SA 3.0]: https://creativecommons.org/licenses/by-sa/3.0
