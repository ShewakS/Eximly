import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function validateUploadFile(file: File): string | null {
  if (!ALLOWED_MIME.includes(file.type)) {
    return 'Only PDF and image files (JPEG, PNG, WebP) are allowed';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be under 10 MB';
  }
  return null;
}

export async function saveUploadFile(
  file: File,
  shipmentId: string,
  documentType: string
): Promise<{ fileUrl: string; fileName: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.jpg');
  const safeName = `${documentType}-${Date.now()}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'shipments', shipmentId);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, safeName), buffer);

  return {
    fileUrl: `/uploads/shipments/${shipmentId}/${safeName}`,
    fileName: file.name,
  };
}
