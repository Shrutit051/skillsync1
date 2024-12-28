"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Textarea } from './ui/textarea'
import { TTSWrapper } from './tts-wrapper'

interface JobFormData {
  title: string
  description: string
  salary: string
  location: string
  qualifications: string
  disabilityTypes: string[]
  requirements: string
}

const DISABILITY_TYPES = [
  'Visual Impairment',
  'Hearing Impairment',
  'Physical Disability',
  'Cognitive Disability',
  'Speech Impairment',
  'Multiple Disabilities'
]

export function CreateJobModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    salary: '',
    location: '',
    qualifications: '',
    disabilityTypes: [],
    requirements: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    try {
      setIsSubmitting(true)

      // Get company data from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user.id) throw new Error('Not logged in')

      // Add job to Firestore
      const jobData = {
        ...formData,
        companyId: user.id,
        companyName: user.companyName,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        searchableFields: [
          formData.title.toLowerCase(),
          formData.location.toLowerCase(),
          ...formData.disabilityTypes.map(type => type.toLowerCase())
        ]
      }

      const docRef = await addDoc(collection(db, 'jobs'), jobData)
      console.log('Job created with ID:', docRef.id)
      onClose()

    } catch (error) {
      console.error('Error creating job:', error)
      alert('Failed to create job posting')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleDisabilityType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      disabilityTypes: prev.disabilityTypes.includes(type)
        ? prev.disabilityTypes.filter(t => t !== type)
        : [...prev.disabilityTypes, type]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b-4 border-black pb-4">
          <DialogTitle className="text-2xl font-bold">
            <TTSWrapper>Create New Job Posting</TTSWrapper>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              <TTSWrapper>Job Title</TTSWrapper>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                title: e.target.value
              }))}
              required
              className="border-2 border-black focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              <TTSWrapper>Job Description</TTSWrapper>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              required
              className="border-2 border-black focus:ring-2 focus:ring-black min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">
                <TTSWrapper>Salary Range</TTSWrapper>
              </Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  salary: e.target.value
                }))}
                required
                className="border-2 border-black focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                <TTSWrapper>Location</TTSWrapper>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
                required
                className="border-2 border-black focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              <TTSWrapper>Suitable for Disability Types</TTSWrapper>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {DISABILITY_TYPES.map(type => (
                <Button
                  key={type}
                  type="button"
                  variant={formData.disabilityTypes.includes(type) ? "default" : "outline"}
                  onClick={() => toggleDisabilityType(type)}
                  className="justify-start border-2 border-black transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <TTSWrapper>{type}</TTSWrapper>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">
              <TTSWrapper>Required Qualifications</TTSWrapper>
            </Label>
            <Textarea
              id="qualifications"
              value={formData.qualifications}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                qualifications: e.target.value
              }))}
              required
              className="border-2 border-black focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">
              <TTSWrapper>Special Requirements/Accommodations</TTSWrapper>
            </Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                requirements: e.target.value
              }))}
              placeholder="Describe any special accommodations or requirements for the role"
              className="border-2 border-black focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose} 
              className="border-2 border-black hover:bg-[#FFB4B4] transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <TTSWrapper>Cancel</TTSWrapper>
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-[#B4E4FF] text-black border-2 border-black hover:bg-[#83D6FF] transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <TTSWrapper>
                {isSubmitting ? 'Creating...' : 'Create Job'}
              </TTSWrapper>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

