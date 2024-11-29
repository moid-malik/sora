export default function About() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Moid Malik</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Software developer and tech enthusiast, passionate about building efficient applications and sharing knowledge with others.
          </p>
        </div>
        <div className="space-y-8">
          <div className="rounded-lg border bg-card p-8 hover:bg-accent transition-colors">
            <h2 className="text-2xl font-semibold mb-4">The Beginning</h2>
            <p className="text-muted-foreground">
              Started with HTML, CSS, and JavaScript, laying the foundation for a deeper exploration into the vast world of programming technologies.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-8 hover:bg-accent transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground">
              Mastered Python, TypeScript, React, React Native, and Next.js. Proficient with modern tools like TailwindCSS, Framer Motion, and ShadCN.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-8 hover:bg-accent transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Vision & Goals</h2>
            <p className="text-muted-foreground">
              Aspiring to become a highly successful developer while maintaining a strong focus on teaching and mentoring others in their coding journey.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-8 hover:bg-accent transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Community Impact</h2>
            <p className="text-muted-foreground">
              Dedicated to creating educational content, sharing insights, and building a supportive community for both beginners and experienced developers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
