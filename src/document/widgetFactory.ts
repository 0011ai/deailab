import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { CommandRegistry } from '@lumino/commands';
import { BhlDocWidget } from './bhlDocWidget';
import { Widget } from '@lumino/widgets';

export class BhlDocWidgetFactory extends ABCWidgetFactory<BhlDocWidget> {
  constructor(options: BhlDocWidgetFactory.IOptions) {
    super(options);
    this._commands = options.commands;
  }

  get commands(): CommandRegistry | undefined {
    return this._commands;
  }
  /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
  protected createNewWidget(context: DocumentRegistry.Context): BhlDocWidget {
    const content = new Widget();
    context.ready.then(() => {
      content.node.innerHTML = context.model.toString();
    });
    return new BhlDocWidget({ context, content });
  }

  private _commands?: CommandRegistry;
}

export namespace BhlDocWidgetFactory {
  export interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
    rendermime?: IRenderMimeRegistry;
    commands: CommandRegistry;
  }
}
