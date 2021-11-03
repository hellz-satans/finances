<template>
  <nav class="bottomnav flex justify-around align-center">
    <div class="bottomnav-control text-center">
      <router-link to="/about" class="flex-col align-center">
        <svg><use xlink:href="#icons-about" /></svg>
        <span class="inline-block">
          About
        </span>
      </router-link>
    </div>

    <div class="bottomnav-control text-center">
      <router-link to="/" class="flex flex-col align-center">
        <img class="house icon" src="/icons/house.png" alt="Home icon" >
        <span class="inline-block">
          Home
        </span>
      </router-link>
    </div>

    <div class="bottomnav-control text-center">
      <router-link to="/categories" class="flex flex-col align-center">
        <svg><use xlink:href="#icons-archives" /></svg>
        <span class="inline-block">
          Categories
        </span>
      </router-link>
    </div>

    <div class="bottomnav-control text-center">
      <router-link to="/import-export" class="flex flex-col align-center">
        <svg><use xlink:href="#icons-cassette" /></svg>
        <span class="inline-block small">
          Data
        </span>
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss">
.bottomnav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: var(--bottomnav-height);
  width: 100%;
  z-index: 10;
  padding: 0.5rem 0 0.75rem;

  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--fg-dark);
  background-color: var(--bg);
  border-top: 1px solid var(--fg-dark);
  filter: drop-shadow(0.25rem 0.25rem 0.25rem var(--fg));

  a,
  a:visited {
    color: var(--fg);
    text-decoration: none;
  }

  svg, img {
    fill: var(--fg);
    stroke: var(--fg);
    background: transparent;
    max-height: 1.5rem;
    max-width: 1.5rem;
    margin: 0 auto;
  }

  @media (prefers-color-scheme: dark) {
    .house.icon {
      filter: invert(1);
    }
  }
}
</style>
