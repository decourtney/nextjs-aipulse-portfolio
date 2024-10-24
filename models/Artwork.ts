import mongoose from "mongoose";

export interface ArtworkDocument extends mongoose.Document {
  name: string;
  filename: string;
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
  filename: {
    type: String,
    required: [true, "Please provide a filename."],
    maxlength: [60, "Filename cannot be more than 60 characters long"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  src: {
    type: String,
    required: [true, "Please provide a source."],
    maxlength: [255, "Source cannot be more than 255 characters long"],
  },
  alt: {
    type: String,
    required: [true, "Please provide an alt text."],
  },
});

export default mongoose.models.Artwork ||
  mongoose.model<ArtworkDocument>("Artwork", ArtworkSchema);
