'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { MultiStep } from '@/components/multi-step'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'O usuário precisa ter pelo menos 3 letras.',
    })
    .regex(/([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  fullName: z
    .string()
    .min(10, {
      message: 'O nome completo precisa ter pelo menos 10 letras.',
    })
    .regex(/([a-z]+)$/i, {
      message: 'O nome completo pode ter apenas letras.',
    })
    .transform((username) => username.toLowerCase()),
})

export default function Register() {
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  useEffect(() => {
    if (searchParams.get('username')) {
      form.setValue('username', String(searchParams.get('username')))
    }
  }, [form, searchParams])

  return (
    <main className="m-auto max-w-[572px] px-0 py-6">
      <div className="flex flex-col gap-2 px-4 py-6">
        <strong className="text-2xl font-bold">
          Bem-vindo ao Agendamento Fácil!
        </strong>
        <text className="mb-6 text-base dark:text-gray-200">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </text>
        <MultiStep />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-8 rounded-lg bg-zinc-950 px-6 py-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="seu-usuário" {...field} />
                </FormControl>
                <FormMessage className="absolute -bottom-5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="seu-nome" {...field} />
                </FormControl>
                <FormMessage className="absolute -bottom-5" />
              </FormItem>
            )}
          />
          <Button
            className="h-12 w-full bg-yellow-600 hover:bg-green-700 dark:text-white"
            type="submit"
          >
            Próximo passo <ArrowRight />
          </Button>
        </form>
      </Form>
    </main>
  )
}
