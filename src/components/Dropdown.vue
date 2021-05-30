<template>
  <div class="dropdown relative">
    <select
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="block appearance-none w-full p-2 rounded focus:outline-none"
    >
      <option v-if="!required" value=""></option>
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
    required: { type: Boolean, default: false },
    options: { type: Array, required: true, },
    placeholder: { type: String, default: "Select an option", },
  },
}
</script>
