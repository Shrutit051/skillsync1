"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function AddJobForm() {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [salary, setSalary] = useState("")
  const [jobType, setJobType] = useState("")
  const [workType, setWorkType] = useState("")
  const [qualification, setQualification] = useState("")
  const [location, setLocation] = useState("")
  const [disabilityType, setDisabilityType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the job posting logic
    console.log("Job posted", { jobTitle, jobDescription, salary, jobType, workType, qualification, location, disabilityType })
    toast({
      title: "Job Added Successfully",
      description: "Your new job posting has been added to the portal.",
    })
    // Reset form fields
    setJobTitle("")
    setJobDescription("")
    setSalary("")
    setJobType("")
    setWorkType("")
    setQualification("")
    setLocation("")
    setDisabilityType("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input id="job-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea id="job-description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-type">Job Type</Label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-type">Work Type</Label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger>
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualification">Minimum Qualification</Label>
            <Input id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disability-type">Disability Type</Label>
            <Select value={disabilityType} onValueChange={setDisabilityType}>
              <SelectTrigger>
                <SelectValue placeholder="Select disability type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="visual">Visual</SelectItem>
                <SelectItem value="hearing">Hearing</SelectItem>
                <SelectItem value="cognitive">Cognitive</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Post Job</Button>
        </form>
      </CardContent>
    </Card>
  )
}

