"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TTSWrapper } from '../../components/tts-wrapper'
import { MainNav } from '../../components/main-nav'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/')
      return
    }
    setUser(JSON.parse(storedUser))
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#FFF5E4]">
      <MainNav />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 bg-[#FFB4B4] p-4 inline-block transform -rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <TTSWrapper>Company Profile</TTSWrapper>
        </h1>
        
        <div className="bg-white border-4 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
          <div className="grid md:grid-cols-2 gap-8">
            <ProfileSection title="Company Name" content={user.companyName} />
            <ProfileSection title="Business Registration Number" content={user.businessRegNumber} />
            <ProfileSection title="Address" content={user.companyAddress} />
            <ProfileSection title="Registration Status" content={user.status} isCapitalize />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 bg-[#B4E4FF] p-2 inline-block transform -rotate-1 border-2 border-black">
              <TTSWrapper>Registration Certificate</TTSWrapper>
            </h3>
            <div className="border-4 border-black p-4 mt-4 bg-[#F8F7F4] transform rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src={`/${user.certificatePath}`} 
                alt="Registration Certificate" 
                className="w-full max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfileSection({ title, content, isCapitalize = false }: { title: string, content: string, isCapitalize?: boolean }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-2 bg-[#B4E4FF] p-2 inline-block transform -rotate-1 border-2 border-black">
        <TTSWrapper>{title}</TTSWrapper>
      </h3>
      <TTSWrapper>
        <p className={`bg-white p-4 border-2 border-black transform rotate-1 ${isCapitalize ? 'capitalize' : ''}`}>
          {content}
        </p>
      </TTSWrapper>
    </div>
  )
}

