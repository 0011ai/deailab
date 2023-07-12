import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';
import { bhlPlugin } from './document/plugins';
import { toolbarPlugin } from './toolbar/plugins';
import { IDeAIProtocol, IDict } from './token';
/**
 * Initialization data for the DeAILab extension.
 */
const plugin: JupyterFrontEndPlugin<IDeAIProtocol> = {
  id: 'DeAILab:plugin',
  description: 'A JupyterLab extension for DeAI.',
  autoStart: true,
  provides: IDeAIProtocol,
  activate: (app: JupyterFrontEnd): IDeAIProtocol => {
    console.log('JupyterLab extension DeAILab is activated!');
    const deaiData: IDeAIProtocol = {
      availableProtocol: {}
    };
    requestAPI<{ payload: IDict }>()
      .then(data => {
        deaiData.availableProtocol = data.payload['availableProtocol'];
      })
      .catch(reason => {
        console.error(
          `The DeAILab server extension appears to be missing.\n${reason}`
        );
      });

    return deaiData;
  }
};

export default [plugin, bhlPlugin, toolbarPlugin];
