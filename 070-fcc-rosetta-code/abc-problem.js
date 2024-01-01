function canMakeWord(word) {
  const blocks = [
    'BO', 'XK', 'DQ', 'CP',
    'NA', 'GT', 'RE', 'TG',
    'QD', 'FS', 'JW', 'HU',
    'VI', 'AN', 'OB', 'ER',
    'FS', 'LY', 'PC', 'ZM',
  ];

  for (let l of word.toUpperCase()) {
    const index = blocks
      .findIndex(e => e.includes(l));

    if (index < 0)
      return false;
    
    blocks.splice(index, 1);
  }

  return true;
}