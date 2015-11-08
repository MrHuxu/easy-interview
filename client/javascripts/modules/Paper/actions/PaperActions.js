import { rootStore } from '../../../rootStore';

export const SAVE_PAPER = 'SAVE_PAPER';
export function savePaper (paperName) {
  return {
    type: SAVE_PAPER,
    content: {
      id: Math.random() * 1000,
      name: paperName,
      questions: rootStore.getState().selection
    }
  };
};