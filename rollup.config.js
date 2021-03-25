import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
export default {
  plugins: [
    commonjs({
      namedExports: {
        'react-dom': ['createPortal', 'findDOMNode']
      }
    })
  ],
  external: Object.keys(pkg.peerDependencies || {})
}
