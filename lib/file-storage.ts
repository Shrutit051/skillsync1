import fs from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function saveFileLocally(
  file: File,
  subDirectory: string
): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('directory', subDirectory)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.path
  } catch (error) {
    console.error('Error saving file:', error)
    throw new Error('Failed to save file')
  }
} 