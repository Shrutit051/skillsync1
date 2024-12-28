"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { TTSWrapper } from './tts-wrapper'

type UserType = 'company' | 'employee' | null

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [userType, setUserType] = useState<UserType>(null)
  const [regNumber, setRegNumber] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCompanyLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const companiesRef = collection(db, 'companies')
      const q = query(companiesRef, where('businessRegNumber', '==', regNumber))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError('Company not found')
        return
      }

      const companyData = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      }

      // Store company data in localStorage
      localStorage.setItem('user', JSON.stringify({
        type: 'company',
        ...companyData
      }))

      // Trigger refresh of navigation
      window.dispatchEvent(new Event('auth-change'))
      onClose()
    } catch (error) {
      console.error('Login error:', error)
      setError('Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <TTSWrapper>Login to SkillSync</TTSWrapper>
          </DialogTitle>
          <DialogDescription>
            <TTSWrapper>Choose how you want to login</TTSWrapper>
          </DialogDescription>
        </DialogHeader>

        {!userType ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-32"
              onClick={() => setUserType('company')}
            >
              <TTSWrapper>
                Company Login
              </TTSWrapper>
            </Button>
            <Button
              variant="outline"
              className="h-32"
              onClick={() => setUserType('employee')}
            >
              Employee Login
            </Button>
          </div>
        ) : userType === 'company' ? (
          <form onSubmit={handleCompanyLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="regNumber">Business Registration Number</Label>
                <Input
                  id="regNumber"
                  placeholder="Enter your 21-digit registration number"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  maxLength={21}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setUserType(null)}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p>Employee login functionality coming soon...</p>
            <Button onClick={() => setUserType(null)}>Back</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 