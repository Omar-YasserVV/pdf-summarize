function PageHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}

export default PageHeader
