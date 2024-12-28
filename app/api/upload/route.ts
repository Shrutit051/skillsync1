import { writeFile, mkdir } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const directory = formData.get('directory') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file received' },
        { status: 400 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', directory)
    await mkdir(uploadDir, { recursive: true })

    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = uniquePrefix + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '')
    const filePath = path.join(uploadDir, filename)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const relativePath = path.join('uploads', directory, filename)
    
    return NextResponse.json({ path: relativePath })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
} 