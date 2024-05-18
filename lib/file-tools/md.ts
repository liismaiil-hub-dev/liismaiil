
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const getDir = (path: string) => join(process.cwd(), path);

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
}

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  return { ...data, content };
}

const getAllItems = (
  fileNames: string[],
  get: (name: string) ) => {
  const items = fileNames
    .map((name) => get(name))
    .sort((item1, item2) => (item1.date > item2.date ? -1 : 1));
  return items;
}

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(html)
    .use(remarkGfm)
    .process(markdown);

  return result.toString();
}

const saveSearchData = (content: ) => {
  const searchFile = getDir("/sprints/search/index.json");
  const searchItemList: [] = [];

  Object.keys(content).forEach((dataSource) => {
    const contentName = dataSource  ;

    content[contentName].forEach((data) => {
      const searchItem:  = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        category: contentName
      };

      searchItemList.push(searchItem);
    });
  })

  fs.writeFileSync(searchFile, JSON.stringify(searchItemList, null, 2));
}

export {
  getAllItems, getDir,
  getFileNames,
  getItemInPath, markdownToHtml,
  saveSearchData
};

