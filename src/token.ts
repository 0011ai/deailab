import { IWidgetTracker } from '@jupyterlab/apputils';
import { IDocumentWidget } from '@jupyterlab/docregistry';
import { Token } from '@lumino/coreutils';
import { Widget } from '@lumino/widgets';
import { BhlDocWidget } from './widgets/bhlDocWidget';

export const IBhlViewerTracker = new Token<IBhlViewerTracker>(
  'bhl:IBhlViewerTracker',
  'A widget tracker for bhl file.'
);

export type IBhlViewerTracker = IWidgetTracker<BhlDocWidget>;

export type IBhlDocWidget = IDocumentWidget<Widget>;
