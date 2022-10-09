import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
// javascript obfuscator
import { obfuscator } from 'rollup-obfuscator';
import sd from 'silly-datetime'

const getZoneTime = (offset)=> {
  let localtime = new Date();
  let localmesc = localtime.getTime();
  let localOffset = localtime.getTimezoneOffset() * 60000;
  let utc = localOffset + localmesc;
  let calctime = utc + (3600000 * offset);
  return new Date(calctime);
}

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env.VITE_BUILD_TIME = sd.format(getZoneTime(8), 'YYYY-MM-DD HH:mm:ss');
  return defineConfig({
    plugins: [
      vue(),
      legacy({
        targets: ['defaults']
      }),
      obfuscator({
        // see https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        debugProtection: true,
        debugProtectionInterval: 500,
        renameGlobals: true,
        simplify: true,
        splitStrings: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        selfDefending: true,
      }),
    ],
    build: {
      assetsInlineLimit: 1024 * 1024,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/bobh.encrypted.[name].[hash].js',
          chunkFileNames: 'assets/bobh.chunk.[name].[hash].js',
          assetFileNames: 'assets/bobh.assets.[name].[hash].[ext]',
        }
      }
    }
  });
}
