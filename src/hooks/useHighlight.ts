export function useHighlight() {
  const highlightText = (words, query) => {
    if (query) {
      const iQuery = new RegExp(query, 'ig');
      return words.toString().replace(iQuery, (matchedTxt) => {
        return "<span class='highlight'>" + matchedTxt + '</span>';
      });
    }
    return words;
  };

  return { highlightText };
}
