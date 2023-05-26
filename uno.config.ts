// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss';
export default defineConfig({
  presets: [presetUno(), presetIcons()],
  // ...UnoCSS options
  shortcuts: [
    {
      btn: 'text-white rounded-1 text-xs p-y-1 p-x-2 border-none cursor-pointer',
      'btn-primary': 'btn  bg-blue',
      'btn-danger': 'btn bg-red',
      'btn-warning': 'btn bg-orange',
      'text-omit': 'whitespace-nowrap overflow-hidden text-ellipsis',
      'c-primary': 'bg-#',
      mask: 'w-screen h-screen absolute bg-black opacity-40% top-0 z-99',
      glassMask: 'bg-white bg-opacity-50 backdrop-blur-md drop-shadow-lg',
    },
  ],
  theme: {
    colors: {
      primary: '#27374D',
      secondary: '#526D82',
      bgColor: '#E5F9DB',
      fontColor: '#9DB2BF',
    },
  },
});
