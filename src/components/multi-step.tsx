'use client'

import React from 'react'

import { Progress } from './ui/progress'

interface MultiStep {
  currentStep: number
  size: number
}

export function MultiStep() {
  // const [progress, setProgress] = React.useState<number>(0)

  const [currentStep] = React.useState(2)
  const totalSteps = 4 // número total de passos

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-medium dark:text-gray-200">
        Passo {currentStep} de {totalSteps}
      </div>
      <Progress className="h-3" value={progress} />
    </div>
  )
}
