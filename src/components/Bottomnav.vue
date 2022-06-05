<template>
  <nav :class="{bottomnav: true, compact: compact}">
    <div class="bottomnav-control">
      <router-link to="/about" class="flex-col align-center">
        <svg><use xlink:href="#icons-about" /></svg>
        <span class="block">
          {{ $t('navbar.about') }}
        </span>
      </router-link>
    </div>

    <div class="bottomnav-control circlet flex-row justify-center grow">
      <router-link
        to="/transfer"
        class="icon left-circlet"
      >
        &#8644;
        <span aria-hidden="true" :aria-label="$t('actions.transfer')" hidden class="hidden inline-block">
          {{ $t('actions.transfer') }}
        </span>
      </router-link>

      <router-link to="/" class="circlet-center flex flex-col justify-center align-center">
        <img class="house icon" src="/icons/house.png" alt="Home icon" >
        <span class="inline-block max-w-full">
          {{ $t('navbar.home') }}
        </span>
      </router-link>

      <router-link
        to="/expense/new"
        class="icon right-circlet"
      >
        +
        <span aria-hidden="true" :aria-label="$t('actions.add')" hidden class="hidden inline-block">
          {{ $t('actions.add') }}
        </span>
      </router-link>
    </div>

    <div class="bottomnav-control">
      <router-link to="/settings" class="flex flex-col align-center">
        <svg><use xlink:href="#icons-settings" /></svg>
        <span class="inline-block small">
          {{ $t('navbar.settings') }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    compact: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss">
.bottomnav {
  --height: var(--bottomnav-height);
  position: fixed;
  bottom: 0;
  left: 0;
  height: var(--height);
  width: 100%;
  z-index: 10;
  padding: 0;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--fg-dark);
  background-color: var(--bg);
  border-top: 1px solid var(--fg-dark);
  filter: drop-shadow(0.25rem 0.25rem 0.25rem var(--fg));

  &.compact {
    --height: var(--bottomnav-height-compact);
  }

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

  .circlet {
    border-radius: 100%;
    //border: 1px solid red;
  }

  .bottomnav-control {
    height: 100%;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    flex-basis: 25%;

    &.grow {
      flex-grow: 1;
    }

    .icon {
      font-size: 1.5rem;
      display: block;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }

    .left-circlet {
      border-radius: 20px;
      width: 25%;
    }

    .circlet-center {
      height: var(--bottomnav-height);
      width: 50%;

      background-color: var(--bg);
      border: 1px solid var(--fg-dark);
      border-radius: 100%;
      box-shadow: 0 0 0.25rem 0 var(--bg);
    }

    .right-circlet {
      border-radius: 20px;
      width: 25%;
    }

    span {
      max-width: 8em;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-x: hidden;
    }
  }

  @media (prefers-color-scheme: dark) {
    .house.icon {
      filter: invert(1);
    }
  }
}
</style>
