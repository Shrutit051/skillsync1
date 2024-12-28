import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface Job {
  id: string
  title: string
  description: string
  salary: string
  location: string
  qualifications: string
  disabilityTypes: string[]
  requirements: string
  companyName: string
  companyId: string
  status: string
  createdAt: any
  updatedAt: any
}

export function useJobs(searchQuery: string = '', selectedDisabilities: string[] = []) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true)
        const jobsRef = collection(db, 'jobs')
        const snapshot = await getDocs(jobsRef)
        
        const fetchedJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Job[]

        // Sort by creation date (newest first)
        fetchedJobs.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
        
        setJobs(fetchedJobs)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('Failed to load jobs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Filter jobs based on search query and selected disabilities
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Filter by search query
      const searchTerms = searchQuery.toLowerCase().split(' ')
      const jobText = `${job.title} ${job.description} ${job.location} ${job.companyName}`.toLowerCase()
      const matchesSearch = searchTerms.every(term => jobText.includes(term))

      // Filter by selected disabilities
      const matchesDisabilities = selectedDisabilities.length === 0 || 
        selectedDisabilities.some(disability => 
          job.disabilityTypes.includes(disability)
        )

      return matchesSearch && matchesDisabilities && job.status === 'active'
    })
  }, [jobs, searchQuery, selectedDisabilities])

  return {
    jobs: filteredJobs,
    isLoading,
    error
  }
} 