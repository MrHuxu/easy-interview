import { rootStore } from '../../../rootStore';

export const SAVE_PAPER = 'SAVE_PAPER';
export function savePaper (paperInfos) {
  return {
    type: SAVE_PAPER,
    content: Object.assign({
      id: Math.random() * 1000,
      questions: rootStore.getState().selection
    }, paperInfos)
  };
};