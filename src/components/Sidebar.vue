<template>
  <nav class="sidebar">
    <a
      href="#"
      class="burger"
      id="navmenu"
      :data-open="!!visible"
      @click.stop.prevent="visible = !visible"
    >
      <div></div>
      <span hidden>Menu</span>
      <div></div>
      <div></div>
    </a>

    <transition name="grow-235">
      <nav v-if="visible" aria-labelledby="navmenu">
        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          :exact="route.exact"
          @click="visible = false"
        >
          <span>{{ route.name }}</span>
        </router-link>
      </nav>
    </transition>
  </nav>
</template>

<script>
import { router } from '@/router'

export default {
  name: "Sidebar",

  data() {
    return {
      visible: false,
    };
  },

  computed: {
    routes() {
      return router.options.routes.filter(el => !el.hide);
    },
  },
}
</script>

<style lang="scss">
$cubic: cubic-bezier(0.4, 0.1, 0.165, 1.0);
$bg: #333;
$border-radius-max: 100em;
$border-radius-mid: 75em;
$border-radius-min: 1em;
$duration: 0.5s;
$final-width: 70%;

$burger-width: 1.50rem;
$burger-line-width: 2px;

.sidebar {
  display: inline-block;

  .burger, .burger:visited {
    border: none;
    color: var(--fg);
    cursor: pointer;
    display: inline-block;
    padding: calc($burger-line-width * 1.5) 0 $burger-line-width;
  }

  .burger {
    div {
      width: $burger-width;
      height: $burger-line-width;
      background-color: var(--fg);
      transition: ease-in-out all 0.2s;

      &:first-child {
        margin-bottom: ($burger-line-width * 2);
      }
      &:last-child {
        margin-top: ($burger-line-width * 2);
      }
    }

    &[data-open="true"] {
      div {
        transform: scale(0);
      }
      div:first-child {
        transform: scale(1.1) rotate(45deg) translate(calc(#{$burger-line-width} * 2.5), calc(#{$burger-line-width} * 2.5));
      }
      div:last-child {
        transform: scale(1.1) rotate(-45deg) translate(calc(#{$burger-line-width} * 1), calc(#{$burger-line-width} * -1.5));
      }
    }
  }

  nav {
    position: absolute;
    top: 2em; // this is arbitrary -- we need to know header's height
    right: 0;
    overflow: hidden;
    width: $final-width;
    text-align: left;
    z-index: 99;

    a {
      color: white;
      display: block;
      background: $bg;
      padding: 0.75em;
      padding-right: 2em;
      text-transform: uppercase;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;

      &:visited { color: white; }
      &.active  { background: lighten($bg, 20%); }

      svg {
        width: 1.2em !important;
        margin-right: 0.5em;
      }

      &:last-child {
        border-radius: 0 0 0 $border-radius-min;
      }
    }
  }
}

// TODO: move these classes out of component?
.grow-235-enter-from {
  transform: translate(50%, -50%) scale(0);
  height: 1em;
  border-radius: 0 0 0 $border-radius-max;
  opacity: 0;
}
.grow-235-leave-from {
  transition: all $duration $cubic;
  border-radius: 0 0 0 $border-radius-min;
}

.grow-235-enter-active {
  transition: all $duration $cubic;
  border-radius: 0 0 0 $border-radius-mid;
}
.grow-235-leave-active {
  transition: all $duration $cubic;
  border-radius: 0 0 0 $border-radius-mid;
}

.grow-235-enter-to {
  transform: translate(0, 0) scale(1);
  border-radius: 0 0 0 $border-radius-min;
  height: auto;
  opacity: 1;
}
.grow-235-leave-to {
  transform: translate(50%, -50%) scale(0);
  border-radius: 0 0 0 $border-radius-max;
  opacity: 0;
}
</style>
