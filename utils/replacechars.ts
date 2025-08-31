
export function replaceSpecialCharacters(str: string )   {
    const charMap: Record<string, string>= {
      'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
      'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
      'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
      'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
      'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
      'ç': 'c', 'ñ': 'n',
      '%20': ' ', '@': '', '#': '', '!': '', ',': '', '.': '', '_': ' ', '|': ''  
    };
    
    return str.split('').map(char => charMap[char] || char).join('') ;
  }

  export function sanitizeInput(input:string) {
  return input.replace(/[^a-zA-Z0-9 ]/g, ''); 
}