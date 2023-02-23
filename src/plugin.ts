import { Plugin } from 'vue';
import { directive } from './directive';

export const plugin: Plugin = {
  install: (app) => {
    app.directive('chat-scroll', directive);
  },
};