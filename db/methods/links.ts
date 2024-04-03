import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { links } from "@/db/schema";

export const getAllLinks = async () => {
  return db.query.links.findMany();
};

export const getActiveLinks = async () => {
  return db.query.links.findMany({
    where: eq(links.isArchived, false),
  });
};

export const getArchivedLinks = async () => {
  return db.query.links.findMany({
    where: eq(links.isArchived, true),
  });
};

export const getLinkById = async (id: number) => {
  return db.query.links.findFirst({
    where: eq(links.id, id),
  });
};

export const createLink = async (title: string, url: string) => {
  return db.insert(links).values({
    title,
    url,
  });
};

export const deleteLink = async (id: number) => {
  return db.delete(links).where(eq(links.id, id));
};

export const archiveLink = async (id: number) => {
  return db
    .update(links)
    .set({
      isArchived: true,
    })
    .where(eq(links.id, id));
};
