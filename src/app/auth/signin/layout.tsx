export default async function SigninLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="hero h-full">
      <div className="hero-content w-fit rounded-lg bg-base-100 p-8 text-center">
        <div>
          <h1 className="pb-8 text-lg font-bold sm:text-2xl md:text-3xl lg:text-4xl">Logga in</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
