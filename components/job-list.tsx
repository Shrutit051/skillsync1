"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { MapPin, Building2, IndianRupee, ChevronRight, Briefcase } from 'lucide-react'
import { TTSWrapper } from './tts-wrapper'

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
}

interface JobListProps {
  jobs: Job[]
  isLoading: boolean
  error: string | null
}

export function JobList({ jobs, isLoading, error }: JobListProps) {
  if (error) {
    return (
      <div className="container mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600"
        >
          <TTSWrapper>{error}</TTSWrapper>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-4 px-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <Skeleton className="h-8 w-2/3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
                <Skeleton className="h-10 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4 px-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-4 flex-1">
                    <div>
                      <TTSWrapper>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                      </TTSWrapper>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <TTSWrapper>
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.companyName}
                          </div>
                        </TTSWrapper>
                        <TTSWrapper>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                        </TTSWrapper>
                        <TTSWrapper>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </TTSWrapper>
                        <TTSWrapper>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            Full Time
                          </div>
                        </TTSWrapper>
                      </div>
                    </div>
                    
                    <TTSWrapper>
                      <p className="text-gray-600 line-clamp-2">
                        {job.description}
                      </p>
                    </TTSWrapper>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.disabilityTypes.map((type) => (
                        <TTSWrapper key={type}>
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            {type}
                          </Badge>
                        </TTSWrapper>
                      ))}
                    </div>
                  </div>
                  
                  <TTSWrapper>
                    <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </TTSWrapper>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {jobs.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <TTSWrapper>
              <div className="text-gray-500 text-lg">
                No jobs found matching your criteria
              </div>
            </TTSWrapper>
          </motion.div>
        )}
      </div>
    </div>
  )
}

