/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function embedItem(a: string, b: any): string {
  return `❯ **${a}**: ${b}.\n`;
}
