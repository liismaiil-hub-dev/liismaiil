
import { StageType } from "app/api/sprint/sprint.types";
import { join } from "path";
import { getAllItems, getDir, getFileNames, getItemInPath, markdownToHtml } from "./md";

const BLOG_DIR = getDir("/content/blogs");

const getStageFileNames = () => {
  return getFileNames(BLOG_DIR);
}

const getStagesSlugs = () => {
  return getStageFileNames().map(fileName => fileName.replace(/\.md$/, ""));
}

const getStage = (fileName: string): StageType => {
  const stage = getItemInPath(join(BLOG_DIR, fileName)) as StageType;
  stage.slug = fileName.replace(/\.md$/, "");
  return stage;
}

const getStageBySlug = (slug: string) => {
  const fileName = slug + ".md";
  return getStage(fileName);
}

const getStageBySlugWithMarkdown = async (slug: string): Promise<StageType> => {
  const stage = getStageBySlug(slug);
  stage.content = await markdownToHtml(stage.content);
  return stage;
}

const getStages = (): StageType[] => {
  const names = getStageFileNames();
  return getAllItems(names, getStage) as StageType[];
}

export {
  getStage, getStageBySlug,
  getStageBySlugWithMarkdown, getStageFileNames, getStages,
  getStagesSlugs
};

