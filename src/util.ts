export
const partition = <T>(es: Array<T>, fn: (a: T) => boolean): [Array<T>, Array<T>] =>
    // @ts-ignore
    es.reduce(([p, f], e) => (fn(e) ? [[...p, e], f] : [p, [...f, e]]), [[], []]);
