import Image from 'next/image'

import previewImage from '../../../public/images/preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center gap-5">
      <div className="flex max-w-[480px] flex-col gap-3">
        <h1 className="text-4xl font-bold sm:text-4xl md:text-4xl lg:text-5xl">
          Agendamento descomplicado
        </h1>
        <span className="mt-2 max-w-[480px] text-xl font-medium dark:text-gray-500">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </span>
        <ClaimUsernameForm />
      </div>

      <div className="hidden max-w-[600px] overflow-hidden pr-8 sm:hidden md:flex lg:flex">
        <Image
          height={600}
          src={previewImage}
          alt="preview"
          quality={100}
          priority
        />
      </div>
    </div>
  )
}
