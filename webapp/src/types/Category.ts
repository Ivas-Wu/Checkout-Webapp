export enum Category {
  GROCERIES = 'Groceries',
  ENTERTAINMENT = 'Entertainment',
  MEDICAL = 'Medical',
  TRANSPORTATION = 'Transportation',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  OTHER = 'Other',
}

export function convertCategory(value: string): Category {
  if (value.toUpperCase() === 'GROCERIES' || value.toUpperCase() === 'FOOD') {
    return Category.GROCERIES;
  } else if (
    value.toUpperCase() === 'ENTERTAINMENT' ||
    value.toUpperCase() === 'FUN'
  ) {
    return Category.ENTERTAINMENT;
  } else if (
    value.toUpperCase() === 'MEDICAL' ||
    value.toUpperCase() === 'HEALTH'
  ) {
    return Category.MEDICAL;
  } else if (
    value.toUpperCase() === 'TRANSPORTATION' ||
    value.toUpperCase() === 'CAR'
  ) {
    return Category.TRANSPORTATION;
  } else if (
    value.toUpperCase() === 'HOUSING' ||
    value.toUpperCase() === 'LIVING'
  ) {
    return Category.HOUSING;
  } else if (value.toUpperCase() === 'UTILITIES') {
    return Category.UTILITIES;
  }
  return Category.OTHER;
}
