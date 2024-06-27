'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
})

export function ClaimUsernameForm() {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(claimUsernameValues: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await router.push(`/register?username=${claimUsernameValues.username}`)
    console.log(claimUsernameValues)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex items-center gap-3 rounded-lg bg-slate-900 px-3 py-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Nome</FormLabel> */}
              <FormControl>
                <Input placeholder="seu-usuário" {...field} />
              </FormControl>
              {/* <FormDescription>
                Informe um usuário para fazer uma reserva.
              </FormDescription> */}
              <FormMessage className="absolute -bottom-5" />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          className="h-full bg-green-500 hover:bg-green-600 dark:text-white"
          type="submit"
        >
          Reservar <ArrowRight />
        </Button>
      </form>
    </Form>
  )
}
