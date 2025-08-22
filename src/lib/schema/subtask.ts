import { co, z } from 'jazz-tools';

export const SubTask = co.map({
  title: co.plainText(),
  complete: z.boolean(),
});
