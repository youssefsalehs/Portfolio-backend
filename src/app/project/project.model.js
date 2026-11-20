import { Schema, model } from "mongoose";

import slugify from "slugify";
const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
const projectSchema = new Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    subtitle: { type: String },
    image: imageSchema,
    gallery: [imageSchema],

    technologies: [{ type: String }],

    githubLink: { type: String, unique: true },
    liveLink: { type: String, unique: true },

    stack: [
      {
        type: String,
        enum: ["frontend", "backend", "fullstack"],
      },
    ],

    featured: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    },

    priority: { type: Number },

    year: { type: String },
    duration: { type: String },
    role: { type: String },
    overview: { type: String },
    challenges: [{ type: String }],
    features: [{ type: String }],
    learnings: [{ type: String }],
  },
  {
    timestamps: true,
  },
);
projectSchema.pre("save", function () {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});
const Project = model("Project", projectSchema);
export default Project;
