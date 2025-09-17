export function checkDocumentInputHelper(document: string) {
  switch (document.length) {
    case 11:
      return '999.999.999-99'
    case 9:
      return '99.999.999-9'
    default:
      return '999999999999'
  }
}
