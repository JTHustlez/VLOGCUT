import { pgTable, text, timestamp, boolean, integer, real, jsonb, index } from "drizzle-orm/pg-core";

// ============================================
// AUTH TABLES (BetterAuth)
// ============================================

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  // Subscription fields
  plan: text("plan").default("none").notNull(), // 'none' or 'pro'
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
  // Usage tracking
  projectCount: integer("project_count").default(0).notNull(),
  storageUsedBytes: integer("storage_used_bytes").default(0).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// ============================================
// VIDEO EDITOR TABLES
// ============================================

// Projects - main container for video editing projects
export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  thumbnail: text("thumbnail"), // URL to thumbnail in R2
  // Canvas settings
  canvasWidth: integer("canvas_width").default(1920).notNull(),
  canvasHeight: integer("canvas_height").default(1080).notNull(),
  canvasMode: text("canvas_mode").default("preset").notNull(), // 'preset' | 'original' | 'custom'
  // Background settings
  backgroundColor: text("background_color").default("#000000").notNull(),
  backgroundType: text("background_type").default("color").notNull(), // 'color' | 'blur'
  blurIntensity: integer("blur_intensity").default(8),
  // Project settings
  fps: integer("fps").default(30).notNull(),
  bookmarks: jsonb("bookmarks").$type<number[]>().default([]),
  // Metadata
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
}, (table) => [
  index("projects_user_id_idx").on(table.userId),
]);

// Scenes - scenes within a project (for multi-scene editing)
export const scenes = pgTable("scenes", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  isMain: boolean("is_main").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
}, (table) => [
  index("scenes_project_id_idx").on(table.projectId),
]);

// Media Files - metadata for uploaded media (actual files stored in R2)
export const mediaFiles = pgTable("media_files", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'image' | 'video' | 'audio'
  // Storage info (R2)
  storageKey: text("storage_key").notNull(), // R2 object key
  storageUrl: text("storage_url"), // CDN URL for streaming
  thumbnailKey: text("thumbnail_key"), // R2 key for video thumbnails
  thumbnailUrl: text("thumbnail_url"),
  // Media metadata
  duration: real("duration"), // seconds, for video/audio
  width: integer("width"), // pixels, for video/image
  height: integer("height"), // pixels, for video/image
  fps: real("fps"), // frames per second, for video
  fileSize: integer("file_size").notNull(), // bytes
  mimeType: text("mime_type").notNull(),
  // Flags
  isEphemeral: boolean("is_ephemeral").default(false).notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
}, (table) => [
  index("media_files_project_id_idx").on(table.projectId),
  index("media_files_user_id_idx").on(table.userId),
]);

// Timeline Tracks - tracks in the timeline editor
export const timelineTracks = pgTable("timeline_tracks", {
  id: text("id").primaryKey(),
  sceneId: text("scene_id")
    .notNull()
    .references(() => scenes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'media' | 'text' | 'audio'
  orderIndex: integer("order_index").default(0).notNull(),
  muted: boolean("muted").default(false).notNull(),
  isMain: boolean("is_main").default(false).notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
}, (table) => [
  index("timeline_tracks_scene_id_idx").on(table.sceneId),
]);

// Timeline Elements - elements (clips, text overlays) on tracks
export const timelineElements = pgTable("timeline_elements", {
  id: text("id").primaryKey(),
  trackId: text("track_id")
    .notNull()
    .references(() => timelineTracks.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'media' | 'text'
  name: text("name").notNull(),
  // Timing
  startTime: real("start_time").notNull(), // seconds
  duration: real("duration").notNull(), // seconds
  trimStart: real("trim_start").default(0).notNull(), // seconds trimmed from start
  trimEnd: real("trim_end").default(0).notNull(), // seconds trimmed from end
  // State
  hidden: boolean("hidden").default(false).notNull(),
  // For media elements
  mediaId: text("media_id").references(() => mediaFiles.id, { onDelete: "set null" }),
  muted: boolean("muted").default(false),
  // For text elements (stored as JSON for flexibility)
  textProperties: jsonb("text_properties").$type<{
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    backgroundColor: string;
    textAlign: "left" | "center" | "right";
    fontWeight: "normal" | "bold";
    fontStyle: "normal" | "italic";
    textDecoration: "none" | "underline" | "line-through";
    x: number;
    y: number;
    rotation: number;
    opacity: number;
  }>(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
}, (table) => [
  index("timeline_elements_track_id_idx").on(table.trackId),
  index("timeline_elements_media_id_idx").on(table.mediaId),
]);

// Exports - history of exported videos
export const exports = pgTable("exports", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // Export settings
  format: text("format").notNull(), // 'mp4' | 'webm'
  quality: integer("quality").notNull(), // 720, 1080, 2160
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  fps: integer("fps").notNull(),
  // Output
  storageKey: text("storage_key"), // R2 key for exported file
  storageUrl: text("storage_url"), // CDN URL
  fileSize: integer("file_size"),
  duration: real("duration"), // final video duration in seconds
  // Status
  status: text("status").default("pending").notNull(), // 'pending' | 'processing' | 'completed' | 'failed'
  errorMessage: text("error_message"),
  // Timestamps
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
}, (table) => [
  index("exports_project_id_idx").on(table.projectId),
  index("exports_user_id_idx").on(table.userId),
]);

// Export Waitlist (legacy - keeping for backward compatibility)
export const exportWaitlist = pgTable("export_waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
