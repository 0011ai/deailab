import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';
import { WidgetTracker } from '@jupyterlab/apputils';

import { IBhlViewerTracker } from '../token';
import { BhlDocWidget } from '../widgets/bhlDocWidget';
import { BhlDocWidgetFactory } from './widgetFactory';

export const bhlPlugin: JupyterFrontEndPlugin<IBhlViewerTracker> = {
  id: 'bhl-lab:document-plugin',
  autoStart: true,
  provides: IBhlViewerTracker,
  requires: [IRenderMimeRegistry],
  optional: [ILayoutRestorer],
  activate: (app: JupyterFrontEnd, rendermime: IRenderMimeRegistry) => {
    const tracker = new WidgetTracker<BhlDocWidget>({
      namespace: 'bhl-lab:widgets'
    });
    const widgetFactory = new BhlDocWidgetFactory({
      name: 'Bacalhau Lab',
      fileTypes: ['bhl'],
      defaultFor: ['bhl'],
      rendermime,
      commands: app.commands
    });
    widgetFactory.widgetCreated.connect((_, widget) => {
      widget.context.pathChanged.connect(() => {
        tracker.save(widget);
      });
      tracker.add(widget);
    });
    app.docRegistry.addWidgetFactory(widgetFactory);
    // register the filetype
    app.docRegistry.addFileType({
      name: 'bhl',
      displayName: 'BHL',
      mimeTypes: ['text/json'],
      extensions: ['.bhl', '.BHL'],
      fileFormat: 'json',
      contentType: 'file'
    });
    return tracker;
  }
};
