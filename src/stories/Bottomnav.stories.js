import Bottomnav from '../components/Bottomnav.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Bottom Nav',
  component: Bottomnav,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    compact: { control: 'boolean' },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Bottomnav },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<bottomnav v-bind="args" />',
});

export const Normal = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Normal.args = {
};
