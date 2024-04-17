import { type ComponentPropsType } from '../shared';
import { attachmentProps } from './props';

export type AttachmentFileType =
  | 'img'
  | 'css'
  | 'excel'
  | 'word'
  | 'ppt'
  | 'pdf'
  | 'js'
  | 'zip'
  | 'video'
  | 'audio'
  | 'unknow';

export interface AttachmentFile {
  url: string;
  name?: string;
  type?: AttachmentFileType;
  [index: string]: any;
}

export type AttachmentUploader = (file: File) => Promise<AttachmentFile>;

export type AttachmentThumbnail = (file: AttachmentFile) => string;

export type AttachmentProps = ComponentPropsType<typeof attachmentProps>;

export type AttachmentEmits = {
  click: [file: AttachmentFile];
  preview: [file: AttachmentFile];
  remove: [file: AttachmentFile];
  download: [file: AttachmentFile];
  select: [files: AttachmentFile[]];
  change: [files: AttachmentFile[]];
  'update:modelValue': [files: AttachmentFile[]];
  'update:selectValue': [files: AttachmentFile | AttachmentFile[]];
};
