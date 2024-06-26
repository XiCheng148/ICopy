import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-base': 'bg-white dark:bg-#111',
    'bg-secondary': 'bg-gray:5',
    'bg-active': 'bg-gray:10',
    'border-base': 'border-#aaa3',
    'border-box': 'border border-base rounded',
    'text-button':
      'border-box bg-secondary hover:bg-active px3 py1 flex gap-1 items-center justify-center',
    'icon-button': 'border-box bg-secondary hover:bg-active p1',
    'icon-button-sm': 'icon-button p0.5 text-sm',

    'action-button':
      'border border-base rounded flex gap-2 items-center px2 py1 text-sm op75 hover:op100 hover:bg-secondary'
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
