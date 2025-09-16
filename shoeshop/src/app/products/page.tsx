'use client'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'


type Product = { id: string; name: string; slug: string; price_cents: number; image_url: string | null }


export default function ProductsPage() {
const [q, setQ] = useState('')
const [sort, setSort] = useState<'relevance'|'price_asc'|'price_desc'|'name_asc'>('relevance')
const [loading, setLoading] = useState(false)
const [data, setData] = useState<Product[]>([])


useEffect(() => { void fetchProducts() }, [q, sort])


async function fetchProducts() {
setLoading(true)
let query = supabase.from('product').select('id,name,slug,price_cents,image_url').eq('active', true)
if (q) {
query = query.ilike('name', `%${q}%`)
}
if (sort === 'price_asc') query = query.order('price_cents', { ascending: true })
if (sort === 'price_desc') query = query.order('price_cents', { ascending: false })
if (sort === 'name_asc') query = query.order('name', { ascending: true })
const { data, error } = await query.limit(60)
if (!error && data) setData(data)
setLoading(false)
}


return (
<div className="grid gap-4">
<div className="flex items-center gap-3">
<input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Recherche" className="w-full rounded-xl border px-3 py-2"/>
<select value={sort} onChange={(e)=>setSort(e.target.value as any)} className="rounded-xl border px-3 py-2">
<option value="relevance">Pertinence</option>
<option value="price_asc">Prix ↑</option>
<option value="price_desc">Prix ↓</option>
<option value="name_asc">Nom A→Z</option>
</select>
</div>


{loading && <p>Chargement…</p>}


<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{data.map((p) => (
<Link key={p.id} href={`/products/${p.slug}`} className="rounded-2xl border p-3 hover:shadow">
<div className="aspect-square rounded-xl bg-slate-100 overflow-hidden">
{p.image_url ? <img src={p.image_url} alt={p.name} className="h-full w-full object-cover"/> : null}
</div>
<div className="mt-2 text-sm text-slate-500">{(p.price_cents/100).toFixed(2)} €</div>
<div className="font-medium">{p.name}</div>
</Link>
))}
</div>
</div>
)
}