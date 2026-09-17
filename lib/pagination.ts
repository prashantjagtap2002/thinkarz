/**
 * Page numbers to render, collapsing long runs into gaps.
 *
 * Rendering one button per page meant a 200-car inventory produced 34 buttons
 * on a single row, which wrapped into an unusable block on a phone.
 */
export type PageItem = number | 'gap';

export function getPageItems(current: number, total: number, siblings = 1): PageItem[] {
  if (total <= 1) return [1];

  // first + last + current + 2 siblings + 2 gaps
  const maxSlots = siblings * 2 + 5;
  if (total <= maxSlots) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);

  const showLeftGap = left > 2;
  const showRightGap = right < total - 1;

  const items: PageItem[] = [1];
  if (showLeftGap) items.push('gap');

  for (let page = Math.max(left, 2); page <= Math.min(right, total - 1); page += 1) {
    items.push(page);
  }

  if (showRightGap) items.push('gap');
  items.push(total);

  return items;
}
