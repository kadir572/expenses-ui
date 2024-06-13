import { Currency } from '../types/transaction.type'

export const getCurrencyDisplayName = (currency: Currency): string => {
  switch (currency) {
    case Currency.chf:
      return 'Swiss Franc'
    case Currency.eur:
      return 'Euro'
    case Currency.gbp:
      return 'British Pound'
    case Currency.pln:
      return 'Polish Zloty'
    case Currency.try:
      return 'Turkish Lira'
    case Currency.usd:
      return 'US Dollar'
    default:
      return ''
  }
}
