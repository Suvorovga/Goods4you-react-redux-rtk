import { defineConfig, mergeConfig } from "vite";
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment:'jsdom',
    setupFiles: './test/setup.ts',
    globals: true
  }
}))
