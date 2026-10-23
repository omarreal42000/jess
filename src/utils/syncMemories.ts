import { Memory } from '../types/galaxy';
import { AVAILABLE_PHOTOS } from '../data/initialMemories';

export function generateInitialMemoriesTs(memories: Memory[], letterData: any): string {
  const photoList = [...AVAILABLE_PHOTOS];
  memories.forEach(m => {
    if (m.image && !photoList.includes(m.image)) {
      photoList.push(m.image);
    }
  });

  return `import { Memory } from '../types/galaxy';

export const AVAILABLE_PHOTOS = ${JSON.stringify(photoList, null, 2)};

export const INITIAL_MEMORIES: Memory[] = ${JSON.stringify(memories, null, 2)};

export const INITIAL_DEDICATION_LETTER = ${JSON.stringify(letterData || {}, null, 2)};
`;
}

export async function saveMemoriesToDisk(memories: Memory[], letterData: any): Promise<boolean> {
  try {
    const res = await fetch('/api/save-memories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memories, letterData })
    });
    return res.ok;
  } catch (err) {
    console.warn('Could not sync to local disk endpoint:', err);
    return false;
  }
}

export function downloadInitialMemoriesFile(memories: Memory[], letterData: any): void {
  const content = generateInitialMemoriesTs(memories, letterData);
  const blob = new Blob([content], { type: 'text/typescript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'initialMemories.ts';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
