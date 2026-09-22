import { v } from "convex/values";
import { studioMutation, studioQuery } from "./lib/studio";
import {
  resumeDataValidator,
  resumeListItemValidator,
  resumeRecordValidator,
  templateIdValidator,
} from "./resumeModel";

export const list = studioQuery({
  args: {},
  returns: v.array(resumeListItemValidator),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("resumes")
      .withIndex("by_updated")
      .order("desc")
      .take(50);

    return rows.map((row) => ({
      _id: row._id,
      title: row.title,
      templateId: row.templateId,
      updatedAt: row.updatedAt,
    }));
  },
});

export const get = studioQuery({
  args: { id: v.id("resumes") },
  returns: v.union(resumeRecordValidator, v.null()),
  handler: async (ctx, args) => {
    const row = await ctx.db.get(args.id);
    if (!row) {
      return null;
    }

    return {
      _id: row._id,
      title: row.title,
      templateId: row.templateId,
      data: row.data,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  },
});

export const create = studioMutation({
  args: {
    title: v.string(),
    templateId: templateIdValidator,
    data: resumeDataValidator,
    now: v.number(),
  },
  returns: v.id("resumes"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("resumes", {
      title: args.title,
      templateId: args.templateId,
      data: args.data,
      createdAt: args.now,
      updatedAt: args.now,
    });
  },
});

export const update = studioMutation({
  args: {
    id: v.id("resumes"),
    title: v.string(),
    templateId: templateIdValidator,
    data: resumeDataValidator,
    now: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Resume not found");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      templateId: args.templateId,
      data: args.data,
      updatedAt: args.now,
    });

    return null;
  },
});

export const duplicate = studioMutation({
  args: {
    id: v.id("resumes"),
    title: v.string(),
    now: v.number(),
  },
  returns: v.id("resumes"),
  handler: async (ctx, args) => {
    const source = await ctx.db.get(args.id);
    if (!source) {
      throw new Error("Resume not found");
    }

    return await ctx.db.insert("resumes", {
      title: args.title,
      templateId: source.templateId,
      data: source.data,
      createdAt: args.now,
      updatedAt: args.now,
    });
  },
});

export const remove = studioMutation({
  args: { id: v.id("resumes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Resume not found");
    }

    await ctx.db.delete(args.id);
    return null;
  },
});
