import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: 'input[nInputMask]',
  standalone: true,
})
export class NInputMaskDirective {
  private readonly el = inject(ElementRef);
  readonly nInputMask = input.required<string>();

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const inputEl = this.el.nativeElement;
    const originalValue = inputEl.value;
    const maskStr = this.nInputMask();

    if (!maskStr) return;

    let caretPos = inputEl.selectionStart;

    const masked = this.applyMask(originalValue, maskStr);
    inputEl.value = masked;

    if (caretPos !== null) {
      const originalLen = originalValue.length;
      const maskedLen = masked.length;
      caretPos = caretPos + (maskedLen - originalLen);
      inputEl.setSelectionRange(caretPos, caretPos);
    }
  }

  private applyMask(value: string, mask: string): string {
    const raw = this.stripSeparators(value);
    let result = '';
    let rawIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (rawIndex >= raw.length) {
        // Stop if we ran out of raw characters
        break;
      }

      const maskChar = mask[i];
      const rawChar = raw[rawIndex];

      if (maskChar === '9') {
        if (/[0-9]/.test(rawChar)) {
          result += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'a') {
        if (/[a-zA-Z]/.test(rawChar)) {
          result += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === '*') {
        if (/[a-zA-Z0-9]/.test(rawChar)) {
          result += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else {
        result += maskChar;
        // If user typed the separator itself, consume it from raw
        if (rawChar === maskChar) {
          rawIndex++;
        }
      }
    }

    return result;
  }

  private stripSeparators(value: string): string {
    let stripped = '';
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (/[a-zA-Z0-9]/.test(char)) {
        stripped += char;
      }
    }
    return stripped;
  }
}
