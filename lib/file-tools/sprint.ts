import { SprintType as Sprint } from "app/api/sprint/sprint.types";
import { join } from "path";
import { getAllItems, getDir, getFileNames, getItemInPath, markdownToHtml } from "./md";

const SPRINTS_DIR = getDir("/sprints/portfolios");

const getSprintsFileNames = () => {
  return getFileNames(SPRINTS_DIR);
}

const getSprintBySlugs = () => {
  return getSprintsFileNames().map(fileName => fileName.replace(/\.json$/, ""));
}

const getSprint = (fileName: string): Sprint => {
  const sprint = getItemInPath(join(SPRINTS_DIR, fileName)) as Sprint;
  sprint.description = fileName.replace(/\.json$/, "");
  return sprint;
}

const getSprints = (): Sprint[] => {
  const names = getSprintsFileNames();
  return getAllItems(names, getSprint) as Sprint[];
}

const getSprintBySlug = (slug: string) => {
  const fileName = slug + ".json";
  return getSprint(fileName);
}

const getSprintBySlugWithMarkdown = async (slug: string): Promise<Sprint> => {
  const sprint = getSprintBySlug(slug);
  sprint.description = await markdownToHtml(sprint.title);
  return sprint;
}

export {
  getSprintBySlugs, getSprintBySlugWithMarkdown, getSprints
};

