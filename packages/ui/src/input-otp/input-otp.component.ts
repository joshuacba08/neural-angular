import {
  booleanAttribute,
  Component,
  computed,
  type ElementRef,
  input,
  numberAttribute,
  output,
  signal,
  viewChildren,
} from '@angular/core';

type NOtpInputLike = {
  value?: string;
  focus?: () => void;
  select?: () => void;
};

type NOtpKeyEventLike = {
  key?: string;
  preventDefault?: () => void;
};

type NOtpClipboardEventLike = {
  preventDefault?: () => void;
  clipboardData?: { getData(type: string): string } | null;
};

@Component({
  selector: 'n-input-otp',
  standalone: true,
  template: `
    <div class="n-otp" role="group" [attr.aria-label]="ariaLabel()">
      @for (cell of cells(); track $index; let i = $index) {
        <input
          #box
          class="n-otp__box"
          [class.n-otp__box--filled]="!!digits()[i]"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [value]="digits()[i] ?? ''"
          [disabled]="disabled()"
          [placeholder]="placeholder()"
          [attr.aria-label]="'Digit ' + (i + 1)"
          (input)="onInput(i, $event)"
          (keydown)="onKeydown(i, $event)"
          (paste)="onPaste($event)"
          (focus)="onFocus($event)"
        />
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      .n-otp {
        display: flex;
        gap: var(--n-space-2);
      }

      .n-otp__box {
        width: 44px;
        height: 52px;
        border: 1.5px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-surface-2);
        color: var(--n-text-1);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-20);
        font-weight: var(--n-font-weight-semibold);
        text-align: center;
        outline: none;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .n-otp__box--filled {
        border-color: color-mix(in srgb, var(--n-color-primary) 35%, transparent);
      }

      .n-otp__box:focus {
        border-color: var(--n-color-primary);
        background: var(--n-surface-3);
        box-shadow: 0 0 0 3px var(--n-color-primary-alpha-10);
      }

      .n-otp__box:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }
    `,
  ],
})
export class NInputOtp {
  readonly length = input(6, { transform: numberAttribute });
  readonly value = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly placeholder = input('·');
  readonly ariaLabel = input('One-time code');
  readonly valueChange = output<string>();
  readonly completed = output<string>();

  private readonly boxes = viewChildren<ElementRef<NOtpInputLike>>('box');
  private readonly edits = signal<string[]>([]);

  readonly cells = computed(() => Array.from({ length: this.length() }));
  readonly digits = computed<string[]>(() => {
    const fromValue = this.value().slice(0, this.length()).split('');
    const overrides = this.edits();
    return this.cells().map((_, index) => overrides[index] ?? fromValue[index] ?? '');
  });

  onInput(index: number, event: Event): void {
    const raw = (event as unknown as { target?: { value?: string } }).target?.value ?? '';
    const char = raw.replace(/\D/g, '').slice(-1);

    this.setDigit(index, char);

    if (char) {
      this.focusBox(index + 1);
    }
  }

  onKeydown(index: number, event: NOtpKeyEventLike): void {
    if (event.key === 'Backspace' && !this.digits()[index]) {
      this.focusBox(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault?.();
      this.focusBox(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault?.();
      this.focusBox(index + 1);
    }
  }

  onPaste(event: NOtpClipboardEventLike): void {
    event.preventDefault?.();
    const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '');

    if (!pasted) {
      return;
    }

    const next = this.digits().slice();
    for (let i = 0; i < this.length(); i += 1) {
      next[i] = pasted[i] ?? '';
    }

    this.edits.set(next);
    this.emit(next);
    this.focusBox(Math.min(pasted.length, this.length() - 1));
  }

  onFocus(event: Event): void {
    (event as unknown as { target?: { select?: () => void } }).target?.select?.();
  }

  private setDigit(index: number, char: string): void {
    const next = this.digits().slice();
    next[index] = char;
    this.edits.set(next);
    this.emit(next);
  }

  private emit(values: string[]): void {
    const code = values.join('');
    this.valueChange.emit(code);

    if (code.length === this.length() && values.every((digit) => digit !== '')) {
      this.completed.emit(code);
    }
  }

  private focusBox(index: number): void {
    this.boxes()[index]?.nativeElement.focus?.();
  }
}
