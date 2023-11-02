import { Badge, Button, Card, Text, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'

export function CreateNewUsers () {
  const { adduser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormEvent>) => {
    event.preventDefault()

    setResult(null)
    const form = event.target
    const formData = new FormData(form)

    const name = formData.get('Nombre') as string
    const email = formData.get('Email') as string
    const github = formData.get('git') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }
    // si no tiene usuarios regresa ko y no registra
    adduser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
    <Card className="mt-3 rounded-md bg-stone-500 text-white">
      <form onSubmit={handleSubmit}>
        <TextInput placeholder="Nombre" name="Nombre" />

        <TextInput name="Email" placeholder="Email" />

        <TextInput name="git" placeholder="GitHub" />

        <div>
          <Button className="max-w-fit" color="slate" type="submit">
            Crear Un Usuario
          </Button>
          <span className='ml-3'>
            {result === 'ok' && <Badge className='bg-green-300'>Guardado Correctamente</Badge>}
            {result === 'ko' && <Badge className='bg-red-300'>No se guardo la informacion</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}
