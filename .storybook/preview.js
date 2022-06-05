import { app } from '@storybook/vue3';
import { i18n } from '../src/i18n'
import '../src/styles/main.scss'

i18n.global.locale = 'en'
app.use(i18n)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
