function randomKey() {
  return Math.random().toString(36).substring(5)
}

function formatNumber(value) {
  return !isNaN(value) ? new Intl.NumberFormat('en-US', {minimumFractionDigits: 2}).format(value) : value
}


export {randomKey, formatNumber}