const Currencies = {
 ghs: 'ghs',
 ngn: 'ngn',
 usd: 'usd',
 gbp: 'gbp',
 eur: 'eur'
} as const;

export type Currencies = keyof typeof Currencies;


