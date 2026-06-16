import {
  booleanAttribute,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NPasswordSize, NPasswordStrength } from './password.types.js';

let nextPasswordId = 0;

@Component({
  selector: 'n-password',
  standalone: true,
  imports: [NIcon],
  template: `
    <div
      class="n-password"
      [class.n-password--sm]="size() === 'sm'"
      [class.n-password--md]="size() === 'md'"
      [class.n-password--lg]="size() === 'lg'"
      [class.n-password--invalid]="!!error()"
      [class.n-password--disabled]="disabled()"
    >
      @if (label()) {
        <label class="n-password__label" [for]="inputId">{{ label() }}</label>
      }

      <div class="n-password__shell">
        <input
          class="n-password__control"
          [id]="inputId"
          [type]="visible() ? 'text' : 'password'"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          autocomplete="new-password"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-describedby]="descriptionId()"
          (input)="handleInput($event)"
        />

        <button
          type="button"
          class="n-password__toggle"
          [attr.aria-label]="visible() ? 'Hide password' : 'Show password'"
          [attr.aria-pressed]="visible()"
          [disabled]="disabled()"
          (click)="toggleVisible()"
        >
          <n-icon [name]="visible() ? 'eye-off' : 'eye'" size="sm" />
        </button>
      </div>

      @if (showStrength() && value()) {
        <div
          class="n-password__strength"
          [class.n-password__strength--weak]="strength().level === 'weak'"
          [class.n-password__strength--medium]="strength().level === 'medium'"
          [class.n-password__strength--strong]="strength().level === 'strong'"
        >
          <span class="n-password__bar"></span>
          <span class="n-password__bar"></span>
          <span class="n-password__bar"></span>
        </div>
        <span class="n-password__strength-label">{{ strength().label }}</span>
      }

      @if (error()) {
        <p class="n-password__message n-password__message--error" [id]="messageId">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p class="n-password__message" [id]="messageId">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-password {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-password__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-password__shell {
        position: relative;
        display: flex;
        align-items: center;
      }

      .n-password__control {
        width: 100%;
        min-width: 0;
        padding-right: 42px;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font: inherit;
        outline: none;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .n-password__control::placeholder {
        color: var(--n-field-placeholder);
      }

      .n-password__control:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .n-password__control:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      .n-password--sm .n-password__control {
        min-height: 34px;
        padding-left: var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-password--md .n-password__control {
        min-height: 42px;
        padding-left: var(--n-space-4);
        font-size: var(--n-font-size-14);
      }

      .n-password--lg .n-password__control {
        min-height: 50px;
        padding-left: var(--n-space-5);
        font-size: var(--n-font-size-15);
      }

      .n-password__toggle {
        position: absolute;
        right: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: 0;
        border-radius: var(--n-radius-sm);
        background: transparent;
        color: var(--n-text-3);
        cursor: pointer;
        transition:
          color var(--n-transition-fast),
          background var(--n-transition-fast);
      }

      .n-password__toggle:hover:not(:disabled) {
        background: color-mix(in srgb, var(--n-text-1) 8%, transparent);
        color: var(--n-text-1);
      }

      .n-password__toggle:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 1px;
      }

      .n-password__strength {
        display: flex;
        gap: var(--n-space-1);
        margin-top: var(--n-space-1);
      }

      .n-password__bar {
        flex: 1;
        height: 3px;
        border-radius: var(--n-radius-full);
        background: color-mix(in srgb, var(--n-text-1) 7%, transparent);
        transition: background var(--n-transition-base);
      }

      .n-password__strength--weak .n-password__bar:nth-child(1) {
        background: var(--n-color-danger);
      }

      .n-password__strength--medium .n-password__bar:nth-child(-n + 2) {
        background: var(--n-color-warning);
      }

      .n-password__strength--strong .n-password__bar {
        background: var(--n-color-success);
      }

      .n-password__strength-label {
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10);
        color: var(--n-text-3);
      }

      .n-password__strength--weak ~ .n-password__strength-label {
        color: var(--n-color-danger);
      }

      .n-password__strength--medium ~ .n-password__strength-label {
        color: var(--n-color-warning);
      }

      .n-password__strength--strong ~ .n-password__strength-label {
        color: var(--n-color-success);
      }

      .n-password--invalid .n-password__control {
        border-color: var(--n-color-danger);
        box-shadow: 0 0 0 3px var(--n-color-danger-alpha-10);
      }

      .n-password--disabled {
        opacity: 0.58;
      }

      .n-password__message {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-password__message--error {
        color: var(--n-color-danger);
      }
    `,
  ],
})
export class NPassword {
  readonly inputId = `n-password-${++nextPasswordId}`;
  readonly messageId = `${this.inputId}-message`;

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly value = input('');
  readonly size = input<NPasswordSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly showStrength = input(true, { transform: booleanAttribute });
  readonly valueChange = output<string>();

  private readonly visibleState = signal(false);
  readonly visible = this.visibleState.asReadonly();

  readonly strength = computed<NPasswordStrength>(() => {
    const password = this.value();

    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return { level: 'weak', label: 'Weak' };
    }

    if (password.length < 12 || !/[0-9]/.test(password)) {
      return { level: 'medium', label: 'Medium' };
    }

    return { level: 'strong', label: 'Strong' };
  });

  descriptionId(): string | null {
    return this.error() || this.hint() ? this.messageId : null;
  }

  toggleVisible(): void {
    this.visibleState.update((visible) => !visible);
  }

  handleInput(event: Event): void {
    const value = (event as unknown as { target?: { value?: string } }).target?.value ?? '';
    this.valueChange.emit(value);
  }
}
