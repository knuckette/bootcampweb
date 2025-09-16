import Link from 'next/link'


export default function Page() {
return (
<section className="grid gap-8 md:grid-cols-2 items-center">
<div>
<h1 className="text-4xl font-bold mb-4">Chaussures qui claquent 👟</h1>
<p className="text-lg mb-6">Découvrez notre sélection, filtrez par taille et commandez en 2 minutes.</p>
<Link href="/products" className="rounded-xl border px-4 py-2">Voir les produits</Link>
</div>
<div className="aspect-[4/3] rounded-2xl bg-slate-100" />
</section>
)
}