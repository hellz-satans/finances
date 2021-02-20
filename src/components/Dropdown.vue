<template>
  <div class="dropdown relative">
    <select
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      class="block appearance-none w-full p-2 rounded focus:outline-none"
    >
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
      <span class="icon">&#9660;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",

  props: {
    options: { type: Array, required: true, },
    placeholder: { type: String, default: "Select an option", },
  },
}
</script>
