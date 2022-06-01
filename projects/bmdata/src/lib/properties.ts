export function updateDocumentProperties(
  properties: Record<string, string>
): void {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperties(properties);
}

export function getDocumentProperties(): Record<string, string> {
  const documentProperties = PropertiesService.getDocumentProperties();
  return documentProperties.getProperties();
}
