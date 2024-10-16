import mongoose from "mongoose";
import { CategoryType, categoryValues } from "@/lib/categories";

export interface ArtworkDocument extends mongoose.Document {
  name: string;
  description: string;
  src: string;
  alt: string;
}

const ArtworkSchema = new mongoose.Schema<ArtworkDocument>({
  name: {
    type: String,
    unique: true,
    required: [true, "Please provide a name."],
    maxlength: [60, "Name cannot be more than 60 characters long"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
    maxlength: [255, "Description cannot be more than 255 characters long"],
  },
  src: {
    type: String,
    required: [true, "Please provide a source."],
    maxlength: [255, "Source cannot be more than 255 characters long"],
  },
  alt: {
    type: String,
    required: [true, "Please provide an alt text."],
    maxlength: [255, "Alt text cannot be more than 255 characters long"],
  },
});

export default mongoose.models.Artwork ||
  mongoose.model<ArtworkDocument>("Artwork", ArtworkSchema);
