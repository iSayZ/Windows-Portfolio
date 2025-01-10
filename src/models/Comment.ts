import { Schema, model, models, Document } from 'mongoose';

interface IComment extends Document {
  name: string;
  content: string;
  avatar: any;
  timestamp: Date;
  isApproved: boolean;
}

const CommentSchema = new Schema<IComment>({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 200,
  },
  avatar: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

export const Comment =
  models.Comment || model<IComment>('Comment', CommentSchema);
