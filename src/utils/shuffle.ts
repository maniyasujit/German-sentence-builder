export function shuffleItems<T>(items: readonly T[]): T[] {
  const indexes = Array.from({ length: items.length }, (_, index) => index);

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
  }

  if (indexes.length > 1 && indexes.every((value, index) => value === index)) {
    const [first, ...rest] = indexes;
    indexes.splice(0, indexes.length, ...rest, first);
  }

  return indexes.map((index) => items[index]);
}
