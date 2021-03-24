import commonjs from '@rollup/plugin-commonjs'

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
