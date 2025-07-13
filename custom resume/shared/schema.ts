import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  template: text("template").notNull(),
  name: text("name").notNull(),
  jobTitle: text("job_title").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  
  // Skills section
  skillsSectionLabel: text("skills_section_label").notNull(),
  skillsSubsectionLabel: text("skills_subsection_label"),
  skill1: text("skill_1"),
  skill2: text("skill_2"),
  skill3: text("skill_3"),
  skill4: text("skill_4"),
  skill5: text("skill_5"),
  skill6: text("skill_6"),
  skill7: text("skill_7"),
  skill8: text("skill_8"),
  skill9: text("skill_9"),
  skill10: text("skill_10"),
  additionalSkills: text("additional_skills"),
  
  // Experience section
  experienceSectionLabel: text("experience_section_label").notNull(),
  currentJobTitle: text("current_job_title").notNull(),
  currentCompany: text("current_company").notNull(),
  currentDuration: text("current_duration").notNull(),
  currentAchievement1: text("current_achievement_1"),
  currentAchievement2: text("current_achievement_2"),
  currentAchievement3: text("current_achievement_3"),
  currentAchievement4: text("current_achievement_4"),
  currentAchievement5: text("current_achievement_5"),
  currentAchievement6: text("current_achievement_6"),
  currentAdditionalInfo: text("current_additional_info"),
  
  // Previous experience
  previousJobTitle: text("previous_job_title"),
  previousCompany: text("previous_company"),
  previousDuration: text("previous_duration"),
  previousAchievement1: text("previous_achievement_1"),
  previousAchievement2: text("previous_achievement_2"),
  previousAchievement3: text("previous_achievement_3"),
  previousAchievement4: text("previous_achievement_4"),
  previousAchievement5: text("previous_achievement_5"),
  previousAdditionalInfo: text("previous_additional_info"),
  
  // Education section
  educationSectionLabel: text("education_section_label").notNull(),
  educationDegree: text("education_degree").notNull(),
  educationInstitution: text("education_institution").notNull(),
  educationLocation: text("education_location").notNull(),
  educationAdditionalInfo: text("education_additional_info"),
  
  // References section
  referencesSectionLabel: text("references_section_label").notNull(),
  references: text("references"),
  
  // Custom sections
  customSection1Label: text("custom_section_1_label"),
  customSection1Content: text("custom_section_1_content"),
  customSection2Label: text("custom_section_2_label"),
  customSection2Content: text("custom_section_2_content"),
  customSection3Label: text("custom_section_3_label"),
  customSection3Content: text("custom_section_3_content"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
