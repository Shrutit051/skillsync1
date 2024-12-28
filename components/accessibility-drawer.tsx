"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { Settings } from 'lucide-react'

export function AccessibilityDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [contrast, setContrast] = useState(100)
  const [textSize, setTextSize] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [screenReader, setScreenReader] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [textPacing, setTextPacing] = useState(false)
  const [bigCursor, setBigCursor] = useState(false)

  useEffect(() => {
    document.documentElement.style.filter = `contrast(${contrast}%) saturate(${saturation}%)`
    document.documentElement.style.fontSize = `${textSize}%`
    document.body.classList.toggle('highlight-links', highlightLinks)
    document.body.classList.toggle('big-cursor', bigCursor)
    // Implement screen reader, text pacing functionality here
  }, [contrast, textSize, saturation, highlightLinks, bigCursor])

  return (
    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open accessibility settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Accessibility Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Contrast</Label>
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                  min={50}
                  max={200}
                  step={10}
                />
              </div>
              <div className="space-y-2">
                <Label>Text Size</Label>
                <Slider
                  value={[textSize]}
                  onValueChange={(value) => setTextSize(value[0])}
                  min={75}
                  max={200}
                  step={25}
                />
              </div>
              <div className="space-y-2">
                <Label>Saturation</Label>
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => setSaturation(value[0])}
                  min={0}
                  max={200}
                  step={10}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Screen Reader</Label>
                <Switch
                  checked={screenReader}
                  onCheckedChange={setScreenReader}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Highlight Links</Label>
                <Switch
                  checked={highlightLinks}
                  onCheckedChange={setHighlightLinks}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Text Pacing</Label>
                <Switch
                  checked={textPacing}
                  onCheckedChange={setTextPacing}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Big Cursor</Label>
                <Switch
                  checked={bigCursor}
                  onCheckedChange={setBigCursor}
                />
              </div>
            </div>
          </div>
          <DrawerClose asChild>
            <Button className="w-full mt-6">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

