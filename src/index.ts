import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';
import { bhlPlugin } from './document/plugins';
import { toolbarPlugin } from './toolbar/plugins';
/**
 * Initialization data for the bacalhau_lab extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'bacalhau_lab:plugin',
  description: 'A JupyterLab extension for Bacalhau.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension bacalhau_lab is activated!');

    requestAPI<any>('get-example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The bacalhau_lab server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default [plugin, bhlPlugin, toolbarPlugin];
