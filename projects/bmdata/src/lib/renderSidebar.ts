export default function renderSidebar(
  name: string,
  page: string,
  data: Record<string, string>
): HtmlOutput {
  const template = HtmlService.createTemplateFromFile(page);
  template.data = data;
  const htmlOutput = template.evaluate();
  htmlOutput.setTitle(name);

  return htmlOutput;
}
