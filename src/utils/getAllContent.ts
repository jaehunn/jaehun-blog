import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

const getAllContent = async () => {
  try {
    const contents = await fs.readdir('./content');

    const markdownContentNames = contents.filter((file) => path.extname(file) === '.md');

    const markdownContentFiles = await Promise.all(
      markdownContentNames.map(async (markdownContentName) => {
        return fs.readFile(`./content/${markdownContentName}`, 'utf8');
      }),
    );

    const markdownContent = markdownContentFiles.map((file) => matter(file));

    return markdownContent;
  } catch (err) {
    return null;
  }
};

export default getAllContent;
