import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NInput } from '../input/input.component.js';
import { NInputNumber } from '../input-number/input-number.component.js';
import { NInputOtp } from '../input-otp/input-otp.component.js';
import { NPassword } from '../password/password.component.js';
import { NRating } from '../rating/rating.component.js';

import { NFloatLabel } from '../float-label/float-label.component.js';
import { NIconField, NInputIcon } from '../icon-field/index.js';
import { NInputGroup, NInputGroupAddon } from '../input-group/index.js';
import { NInputMaskDirective } from '../input-mask/input-mask.directive.js';
import { NAutoComplete } from '../autocomplete/autocomplete.component.js';
import { NMultiSelect } from '../multi-select/multi-select.component.js';
import { NListbox } from '../listbox/listbox.component.js';
import { NDatePicker } from '../datepicker/datepicker.component.js';
import { NColorPicker } from '../color-picker/color-picker.component.js';
import { NKnob } from '../knob/knob.component.js';
import { NSelectButton } from '../select-button/select-button.component.js';
import { NToggleButton } from '../toggle-button/toggle-button.component.js';
import { NSplitButton } from '../split-button/split-button.component.js';

const meta: Meta = {
  title: 'Forms/Advanced Forms',
  decorators: [
    moduleMetadata({
      imports: [
        NIcon,
        NInput,
        NInputNumber,
        NInputOtp,
        NPassword,
        NRating,
        NFloatLabel,
        NIconField,
        NInputIcon,
        NInputGroup,
        NInputGroupAddon,
        NInputMaskDirective,
        NAutoComplete,
        NMultiSelect,
        NListbox,
        NDatePicker,
        NColorPicker,
        NKnob,
        NSelectButton,
        NToggleButton,
        NSplitButton,
      ],
    }),
  ],
};

export default meta;

export const Showcase: StoryObj = {
  render: () => ({
    props: {
      autocompleteSuggestions: [],
      onCompleteMethod: (query: string, self: any) => {
        const items = ['Real-ESRGAN x4', 'Real-ESRGAN x2', 'Real-ESRGAN x4+ Anime', 'GFPGAN v1.3', 'SwinIR'];
        self.autocompleteSuggestions = items.filter(i => i.toLowerCase().includes(query.toLowerCase()));
      },
      multiselectOptions: ['4K', 'H.265', 'HDR', 'ProRes', 'AV1'],
      listboxOptions: ['Real-ESRGAN x4', 'Real-ESRGAN x2', 'GFPGAN v1.3', 'SwinIR'],
      splitButtonModel: [
        { label: 'Enhance ×4', icon: 'sparkles', iconColor: 'var(--n-color-primary-bright)' },
        { label: 'Quick ×2', icon: 'zap', iconColor: 'var(--n-color-secondary)' },
        { label: 'Face Restore', icon: 'user', iconColor: 'var(--n-color-success)' },
        { separator: true },
        { label: 'Settings…', icon: 'settings', iconColor: 'var(--n-text-3)' }
      ]
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; max-width: 900px; padding: 24px; box-sizing: border-box;">
        
        <!-- SECTION 1: FloatLabel · IconField · InputGroup -->
        <div>
          <h2 style="font-size: 16px; font-weight: 600; color: var(--n-text-1); border-bottom: 1px solid var(--n-border-1); padding-bottom: 8px; margin-bottom: 20px;">
            FloatLabel · IconField · InputGroup
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Float Label</div>
              <n-float-label>
                <input type="text" placeholder=" " id="fl1" />
                <label for="fl1">Agent name</label>
              </n-float-label>
            </div>
            
            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Float Label · Filled</div>
              <n-float-label>
                <input type="text" placeholder=" " value="Neural Pro v2" id="fl2" />
                <label for="fl2">Base model</label>
              </n-float-label>
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Icon Field · Prefix</div>
              <n-icon-field>
                <n-icon nInputIcon name="user" position="prefix" />
                <input type="text" placeholder="Username" />
              </n-icon-field>
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Icon Field · Suffix</div>
              <n-icon-field>
                <n-icon nInputIcon name="key" position="suffix" />
                <input type="text" placeholder="API Key" />
              </n-icon-field>
            </div>

            <div style="grid-column: 1 / -1;">
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Input Group · Addons</div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <n-input-group>
                  <n-input-group-addon><n-icon name="at-sign" size="sm" /></n-input-group-addon>
                  <input type="text" placeholder="Email address" />
                  <n-input-group-addon>.com</n-input-group-addon>
                </n-input-group>

                <n-input-group>
                  <n-input-group-addon style="font-family: var(--n-font-mono); font-size: 12px;">https://</n-input-group-addon>
                  <input type="text" placeholder="your-domain" />
                  <button type="button" class="nn-btn-go" style="background: var(--n-gradient-primary-secondary, var(--n-gradient-gemini)); border: none; color: white; padding: 0 20px; font-size: 13px; font-weight: 600; cursor: pointer;">Go</button>
                </n-input-group>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: InputNumber · InputMask · InputOtp -->
        <div>
          <h2 style="font-size: 16px; font-weight: 600; color: var(--n-text-1); border-bottom: 1px solid var(--n-border-1); padding-bottom: 8px; margin-bottom: 20px;">
            InputNumber · InputMask · InputOtp
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Input Number</div>
              <n-input-number [value]="8" />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Currency Addon</div>
              <n-input-group>
                <n-input-group-addon style="font-size: 14px; font-weight: 500;">$</n-input-group-addon>
                <input type="text" value="1,280.00" style="font-family: var(--n-font-mono);" />
              </n-input-group>
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Input Mask · Phone</div>
              <input type="text" nInputMask="(999) 999-9999" placeholder="(+1) 000-000-0000" style="font-family: var(--n-font-mono);" />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Input Mask · Date</div>
              <input type="text" nInputMask="99 / 99 / 9999" placeholder="DD / MM / YYYY" style="font-family: var(--n-font-mono);" />
            </div>

            <div style="grid-column: 1 / -1;">
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Input OTP · 6-digit</div>
              <n-input-otp [length]="6" value="482" />
              <div style="font-size: 11.5px; color: var(--n-text-3); margin-top: 8px;">Verify the 6-digit code sent to your email</div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: AutoComplete · MultiSelect · Listbox -->
        <div>
          <h2 style="font-size: 16px; font-weight: 600; color: var(--n-text-1); border-bottom: 1px solid var(--n-border-1); padding-bottom: 8px; margin-bottom: 20px;">
            AutoComplete · MultiSelect · Listbox
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            <div style="grid-column: 1 / -1;">
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">AutoComplete</div>
              <n-autocomplete 
                [suggestions]="autocompleteSuggestions"
                (completeMethod)="onCompleteMethod($event, this)"
                placeholder="Search Real-ESRGAN..."
              />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">MultiSelect · Chips</div>
              <n-multi-select [options]="multiselectOptions" [value]="['4K', 'H.265', 'HDR']" placeholder="+ Add Tag" />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Listbox</div>
              <n-listbox [options]="listboxOptions" [value]="'Real-ESRGAN x2'" />
            </div>
          </div>
        </div>

        <!-- SECTION 4: DatePicker · ColorPicker -->
        <div>
          <h2 style="font-size: 16px; font-weight: 600; color: var(--n-text-1); border-bottom: 1px solid var(--n-border-1); padding-bottom: 8px; margin-bottom: 20px;">
            DatePicker · ColorPicker
          </h2>
          <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">DatePicker (Range)</div>
              <n-datepicker selectionMode="range" [value]="[null, null]" />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">ColorPicker</div>
              <n-color-picker value="4285F4" />
            </div>
          </div>
        </div>

        <!-- SECTION 5: Password · Rating · Knob -->
        <div>
          <h2 style="font-size: 16px; font-weight: 600; color: var(--n-text-1); border-bottom: 1px solid var(--n-border-1); padding-bottom: 8px; margin-bottom: 20px;">
            Password · Rating · Knob
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; align-items: start;">
            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Password Strength</div>
              <n-password value="Neural$2026" />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 7px;">Rating</div>
              <n-rating [value]="4" />
            </div>

            <div>
              <n-knob label="Knob · Denoise" [value]="67" />
            </div>
          </div>
        </div>

        <!-- SECTION 6: SelectButton · ToggleButton · SplitButton -->
        <div>
          <h2 style="font-size: 16px; font-weight: 600; color: var(--n-text-1); border-bottom: 1px solid var(--n-border-1); padding-bottom: 8px; margin-bottom: 20px;">
            SelectButton · ToggleButton · SplitButton
          </h2>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 8px;">Select Button · Output Format</div>
              <n-select-button [options]="['Original', '2× HD', '4K UHD', '8K']" [value]="'2× HD'" />
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 8px;">Toggle Button</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <n-toggle-button onLabel="AI On" offLabel="AI Off" onIcon="sparkles" offIcon="sparkles" [checked]="true" />
                <n-toggle-button onLabel="Live" offLabel="Muted" onIcon="mic" offIcon="mic" [checked]="false" />
              </div>
            </div>

            <div>
              <div style="font-size: 9px; font-family: var(--n-font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--n-text-4); margin-bottom: 8px;">Split Button · Dropdown Action</div>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <n-split-button label="Enhance" icon="sparkles" [model]="splitButtonModel" variant="primary" />
                <n-split-button label="Export" [model]="[
                  { label: 'Export as MP4', icon: 'film' },
                  { label: 'Export Frames', icon: 'image' },
                  { label: 'Export to NAS', icon: 'hard-drive' }
                ]" variant="neutral" />
              </div>
            </div>
          </div>
        </div>

      </div>
    `,
    styles: [
      `
        :host {
          display: block;
          background: #06060e;
          min-height: 100vh;
        }

        .nn-btn-go {
          border-top-right-radius: var(--n-radius-md);
          border-bottom-right-radius: var(--n-radius-md);
          transition: opacity 150ms;
        }

        .nn-btn-go:hover {
          opacity: 0.9;
        }
      `
    ]
  }),
};
