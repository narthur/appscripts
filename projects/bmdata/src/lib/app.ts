export function createTimeDrivenTrigger(func: string, hours: number): void {
  ScriptApp.newTrigger(func).timeBased().everyHours(hours).create();
}
