const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'vnd':
      return '₫';
    case 'usd':
      return '$';
    case 'gbp':
      return '£';
    default:
      return '$';
  }
};

export { getCurrencySymbol };
