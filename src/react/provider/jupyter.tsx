import { IThemeManager } from '@jupyterlab/apputils';
import { ServiceManager } from '@jupyterlab/services';
import * as React from 'react';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { IDocumentManager } from '@jupyterlab/docmanager';

interface IJupyterContext {
  themeManager?: IThemeManager;
  serviceManager?: ServiceManager.IManager;
  context?: DocumentRegistry.Context;
  docManager?: IDocumentManager;
}

export const JupyterContext = React.createContext<IJupyterContext>({
  themeManager: undefined,
  serviceManager: undefined,
  context: undefined,
  docManager: undefined
});

export const useJupyter = () => {
  return React.useContext(JupyterContext);
};
