const mongoose = require("mongoose");
const slugify = require("slugify");
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },

  content: { type: String },

  list: [{ type: String }],

  items: [
    {
      problem: { type: String },
      solution: { type: String },
    },
  ],
});

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subtitle: { type: String },
    image: {
      url: { type: String },
      public_id: { type: String },
    },

    technologies: [{ type: String }],

    githubLink: { type: String },
    liveLink: { type: String },

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

    sections: [sectionSchema],
  },
  {
    timestamps: true,
  },
);
projectSchema.pre("save", function () {
  if (!this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
