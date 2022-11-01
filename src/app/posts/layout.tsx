export default function PostsLayout({ children }: React.PropsWithChildren<Record<never, any>>) {
  return (
    <main className="container mx-auto flex flex-col overflow-visible p-4">
      <h1 className="font-xl font-bold">Inlägg</h1>
      {children}
    </main>
  );
}
