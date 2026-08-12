import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`courses_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'star',
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_highlights_order_idx\` ON \`courses_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_highlights_parent_id_idx\` ON \`courses_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'award',
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_benefits_order_idx\` ON \`courses_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_benefits_parent_id_idx\` ON \`courses_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_curriculum_papers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_curriculum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_curriculum_papers_order_idx\` ON \`courses_curriculum_papers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_curriculum_papers_parent_id_idx\` ON \`courses_curriculum_papers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_curriculum\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`level_title\` text NOT NULL,
  	\`level_subtitle\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_curriculum_order_idx\` ON \`courses_curriculum\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_curriculum_parent_id_idx\` ON \`courses_curriculum\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_career_opportunities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_career_opportunities_order_idx\` ON \`courses_career_opportunities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_career_opportunities_parent_id_idx\` ON \`courses_career_opportunities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_entry_requirements_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_entry_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_entry_requirements_points_order_idx\` ON \`courses_entry_requirements_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_entry_requirements_points_parent_id_idx\` ON \`courses_entry_requirements_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`courses_entry_requirements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_entry_requirements_order_idx\` ON \`courses_entry_requirements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_entry_requirements_parent_id_idx\` ON \`courses_entry_requirements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`student_section_page_scholarship_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`student_section_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`student_section_page_scholarship_photos_order_idx\` ON \`student_section_page_scholarship_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`student_section_page_scholarship_photos_parent_id_idx\` ON \`student_section_page_scholarship_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`student_section_page_scholarship_photos_image_idx\` ON \`student_section_page_scholarship_photos\` (\`image_id\`);`)
  await db.run(sql`DROP TABLE \`student_section_page_cbe_subjects\`;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`awarding_body\` text;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`intake\` text;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`entry_note\` text;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`faculty_description\` text;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`faculty_quote\` text;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`faculty_name\` text;`)
  await db.run(sql`ALTER TABLE \`courses\` ADD \`faculty_title\` text;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` DROP COLUMN \`scholarship_text\`;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` DROP COLUMN \`fee_structure_text\`;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` DROP COLUMN \`fee_structure_url\`;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` DROP COLUMN \`brochure_url\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`student_section_page_cbe_subjects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`student_section_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`student_section_page_cbe_subjects_order_idx\` ON \`student_section_page_cbe_subjects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`student_section_page_cbe_subjects_parent_id_idx\` ON \`student_section_page_cbe_subjects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`student_section_page_cbe_subjects_icon_idx\` ON \`student_section_page_cbe_subjects\` (\`icon_id\`);`)
  await db.run(sql`DROP TABLE \`courses_highlights\`;`)
  await db.run(sql`DROP TABLE \`courses_benefits\`;`)
  await db.run(sql`DROP TABLE \`courses_curriculum_papers\`;`)
  await db.run(sql`DROP TABLE \`courses_curriculum\`;`)
  await db.run(sql`DROP TABLE \`courses_career_opportunities\`;`)
  await db.run(sql`DROP TABLE \`courses_entry_requirements_points\`;`)
  await db.run(sql`DROP TABLE \`courses_entry_requirements\`;`)
  await db.run(sql`DROP TABLE \`student_section_page_scholarship_photos\`;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` ADD \`scholarship_text\` text;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` ADD \`fee_structure_text\` text;`)
  await db.run(sql`ALTER TABLE \`student_section_page\` ADD \`fee_structure_url\` text DEFAULT '/uploads/Fee-Structure-CCA.pdf';`)
  await db.run(sql`ALTER TABLE \`student_section_page\` ADD \`brochure_url\` text DEFAULT '/uploads/CCA-Brochure.pdf';`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`awarding_body\`;`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`intake\`;`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`entry_note\`;`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`faculty_description\`;`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`faculty_quote\`;`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`faculty_name\`;`)
  await db.run(sql`ALTER TABLE \`courses\` DROP COLUMN \`faculty_title\`;`)
}
