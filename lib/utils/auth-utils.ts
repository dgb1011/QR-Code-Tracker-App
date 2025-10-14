import { compare, hash } from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword)
}

export function generateStaffCode(name: string): string {
  const prefix = name.substring(0, 3).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${random}`
}

export function generateQRCode(): string {
  // Generate a unique QR code using UUID v4
  return crypto.randomUUID()
}

