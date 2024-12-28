"use client"

import React from 'react'
import { cn } from '../../lib/utils'

interface DrawerProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Drawer({ children, isOpen, onClose }: DrawerProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-[10px] transition-transform">
            {children}
          </div>
        </div>
      )}
    </>
  )
}

interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerProps
>(({ className, asChild, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  />
))
DrawerTrigger.displayName = "DrawerTrigger"

export const DrawerContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("", className)}>{children}</div>
)

export const DrawerHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("mb-4", className)}>{children}</div>
)

export const DrawerTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
)

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
DrawerClose.displayName = "DrawerClose" 