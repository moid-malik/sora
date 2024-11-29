import Link from "next/link"
import { Github, Mail, MessageCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"

function Footer() {
  return (
    <footer className="border-t px-12">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center">
          <Button asChild size="icon" variant="ghost">
            <Link
              href="https://wa.me/+923126968917"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">WhatsApp</span>
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost">
            <Link
              href="https://github.com/moid-malik"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost">
            <Link href="mailto:moidmalikdev@gmail.com">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
        <div className="">
        <p className="text-sm text-muted-foreground ">Made by Moid Malik with 🤎</p>
        <p className="text-xs text-center text-muted-foreground">
          © 2025 Moid Malik.
        </p>
        </div>
        <div className="lg:mt-0 sm:mt-12 md:mt-0 mt-12">
            <h1 className="text-zinc-400 text-md tracking-tighter leading-none">own the code.</h1>
        </div>
      </div>
    </footer>
  )
}

export default Footer;