import { Button } from "../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

export function JobSearchHero() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Find Your Perfect Career Opportunity
          </h1>
          <p className="text-lg mb-8 text-blue-100">
            Search through thousands of inclusive job opportunities
          </p>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Disability Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Disability</SelectItem>
                  <SelectItem value="visual">Visual Impairment</SelectItem>
                  <SelectItem value="hearing">Hearing Impairment</SelectItem>
                  <SelectItem value="cognitive">Cognitive Disability</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Age Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25 years</SelectItem>
                  <SelectItem value="26-35">26-35 years</SelectItem>
                  <SelectItem value="36-45">36-45 years</SelectItem>
                  <SelectItem value="46+">46+ years</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="w-full mt-4">
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

