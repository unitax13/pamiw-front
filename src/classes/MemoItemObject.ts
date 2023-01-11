class MemoItemObject {
  createdAt: string;
  id: number;
  memoContent: string;
  sanitizedHtml: string;
  sharingLinks: [];
  updatedAt: string;

  constructor(
    createdAt: string,
    id: number,
    memoContent: string,
    sanitizedHtml: string,
    sharingLinks: [],
    updatedAt: string
  ) {
    this.createdAt = createdAt;
    this.id = id;
    this.memoContent = memoContent;
    this.sanitizedHtml = sanitizedHtml;
    this.sharingLinks = sharingLinks;
    this.updatedAt = updatedAt;
  }
}

export { MemoItemObject };
