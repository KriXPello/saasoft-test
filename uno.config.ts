import { defineConfig, presetIcons, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons({
      prefix: 'i-',
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    })
  ]
})
