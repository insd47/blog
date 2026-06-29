export type Comparator<T> = (a: T, b: T) => number;

export class SortChain<T> {
  private readonly items: ReadonlyArray<T>;
  private readonly comparators: Array<Comparator<T>> = [];

  constructor(items: ReadonlyArray<T>) {
    this.items = items;
  }

  sort(comparator: Comparator<T>): this {
    this.comparators.push(comparator);
    return this;
  }

  toArray(): T[] {
    return [...this.items].sort((a, b) => {
      for (const compare of this.comparators) {
        const result = compare(a, b);
        if (result !== 0) return result;
      }

      return 0;
    });
  }
}
