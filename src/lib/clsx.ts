const clsx = (...args: (string | boolean | undefined)[]) => {
  return args.filter(Boolean).join(' ')
}

export default clsx
