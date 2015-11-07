import { rootStore } from '../../../rootStore';

export const SAVE_PAPER = 'SAVE_PAPER';
export function savePaper (paperName) {
  alert(paperName);
  return {
    type: SAVE_PAPER,
    content: {
      id: 3,
      name: paperName,
      questions: rootStore.getState().selection
    }
  };
};