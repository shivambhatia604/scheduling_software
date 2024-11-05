"use client"
import { useState } from 'react';
import { Field, Label } from '@/ui/atoms/fieldset';
import { Input } from '@/ui/atoms/input'

export default function Home() {
  const [name, setName] = useState('');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Sign-IN</h1>
      <Field>
      <Label>Email</Label>
      <Input name="full_name" value={name} onChange={(e) => setName(e.target.value)} />
      <Label>Password</Label>
      <Input name="full_name" value={name} onChange={(e) => setName(e.target.value)} />
    </Field>

    </div>
  );
}
