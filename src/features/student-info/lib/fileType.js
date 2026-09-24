// File type badge from a document URL. SharePoint share links encode the type after the host (":x:" Excel, ":b:" PDF).
const SHAREPOINT = { x: 'XLSX', b: 'PDF', w: 'DOCX' }

export function fileType(href) {
  const sp = href.match(/sharepoint\.com\/:(\w):/)
  if (sp) return SHAREPOINT[sp[1]] ?? 'FILE'
  const ext = href.split('?')[0].split('.').pop()
  return ext.length <= 4 ? ext.toUpperCase() : 'FILE'
}
