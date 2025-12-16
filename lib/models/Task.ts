import mongoose, { Schema, Document, Model, Types } from "mongoose";


export interface ITask extends Document {
  title: string;
  description?: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
