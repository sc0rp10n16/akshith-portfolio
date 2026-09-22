import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { resumeDataValidator, templateIdValidator } from "./resumeModel";

export default defineSchema({
  resumes: defineTable({
    title: v.string(),
    templateId: templateIdValidator,
    data: resumeDataValidator,
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_updated", ["updatedAt"]),
});
