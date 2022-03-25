import fs from 'fs';

export const removeTemp = (path: string) => {
  return fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
