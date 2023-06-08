import { HTMLSelect, ReactWidget } from '@jupyterlab/ui-components';
import * as React from 'react';
import { CommandRegistry } from '@lumino/commands';

const TOOLBAR_CELLTYPE_CLASS = 'jp-Notebook-toolbarCellType';

const TOOLBAR_CELLTYPE_DROPDOWN_CLASS = 'jp-Notebook-toolbarCellTypeDropdown';

export class DeAISwitcher extends ReactWidget {
  /**
   * Construct a new cell type switcher.
   */
  constructor(commands: CommandRegistry) {
    super();
    this._commands = commands;
    this.addClass(TOOLBAR_CELLTYPE_CLASS);
  }

  /**
   * Handle `change` events for the HTMLSelect component.
   */
  handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log('event', event.target.value);
    switch (event.target.value) {
      case 'Bacalhau':
        this._commands.execute('notebook:open-with-bhl', {
          protocol: event.target.value
        });
        break;
      case 'Error':
        this._commands.execute('notebook:open-with-bhl', {
          protocol: event.target.value
        });
        break;
      default:
        break;
    }
    this.update();
  };

  /**
   * Handle `keydown` events for the HTMLSelect component.
   */
  handleKeyDown = (event: React.KeyboardEvent): void => {
    /** */
  };

  render(): JSX.Element {
    return (
      <HTMLSelect
        className={TOOLBAR_CELLTYPE_DROPDOWN_CLASS}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        aria-label={'DeAI Selector'}
        title={'DeAI Protocol'}
        value={'DeAI'}
      >
        <option value="DeAI">DeAI Protocol</option>
        <option value="Bacalhau">BACALHAU</option>
        <option value="Error">ERROR</option>
      </HTMLSelect>
    );
  }

  private _commands: CommandRegistry;
}
