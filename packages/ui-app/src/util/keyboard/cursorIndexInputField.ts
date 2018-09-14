// Copyright 2017-2018 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// obtain current cursor index position of an input field
export default function cursorIndexInputField (event: KeyboardEvent): number | void {
  const selectionStartIndex: number | undefined = (event.target as HTMLInputElement).selectionStart || undefined;

  if (!selectionStartIndex) {
    return;
  }

  return (event.target as HTMLInputElement).value.slice(0, selectionStartIndex).length;
}